// Gmail integration (Replit connector "google-mail").
// Sends a notification email for each new lead via the Gmail API proxy,
// and an automatic confirmation reply to the customer who submitted the form.
import { ReplitConnectors } from "@replit/connectors-sdk";
import { logger } from "./logger.js";

const connectors = new ReplitConnectors();

const NOTIFY_EMAIL = process.env.LEADS_NOTIFY_EMAIL ?? "agenthubguru@gmail.com";

export type LeadNotification = {
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  serviceInterest: string | null;
  message: string | null;
};

function encodeHeader(value: string): string {
  return `=?UTF-8?B?${Buffer.from(value, "utf-8").toString("base64")}?=`;
}

function toBase64Url(input: string): string {
  return Buffer.from(input, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function sendGmail(opts: {
  to: string;
  subject: string;
  body: string;
  replyTo?: string;
}): Promise<void> {
  const headers = [
    `To: ${opts.to}`,
    `Subject: ${encodeHeader(opts.subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
  ];
  if (opts.replyTo) {
    headers.push(`Reply-To: ${opts.replyTo}`);
  }

  const message = [
    ...headers,
    "",
    Buffer.from(opts.body, "utf-8").toString("base64"),
  ].join("\r\n");

  const response = await connectors.proxy(
    "google-mail",
    "/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ raw: toBase64Url(message) }),
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gmail send failed: ${response.status} ${text}`);
  }
}

export async function sendLeadNotification(lead: LeadNotification): Promise<void> {
  const subject = `פנייה חדשה מהאתר: ${lead.name}`;

  const fields: Array<[string, string | null]> = [
    ["שם", lead.name],
    ["טלפון", lead.phone],
    ["אימייל", lead.email],
    ["חברה", lead.company],
    ["תחום עניין", lead.serviceInterest],
    ["הודעה", lead.message],
  ];

  const body = [
    "התקבלה פנייה חדשה דרך טופס יצירת הקשר באתר:",
    "",
    ...fields
      .filter(([, value]) => value && value.trim() !== "")
      .map(([label, value]) => `${label}: ${value}`),
    "",
    "—",
    "Agent Hub Guru AI Engineering",
  ].join("\r\n");

  await sendGmail({ to: NOTIFY_EMAIL, subject, body });
  logger.info({ recipient: NOTIFY_EMAIL }, "lead notification email sent");
}

// Automatic confirmation reply sent to the customer who submitted the form.
// Replies route back to the business inbox via Reply-To.
export async function sendLeadAutoReply(lead: LeadNotification): Promise<void> {
  if (!lead.email || lead.email.trim() === "") {
    return;
  }

  const subject = "קיבלנו את פנייתכם — Agent Hub Guru AI Engineering";

  const greetingName = lead.name?.trim() ? lead.name.trim() : "שלום";

  const body = [
    `שלום ${greetingName},`,
    "",
    "תודה שפניתם אלינו! קיבלנו את פנייתכם ואנחנו שמחים על ההתעניינות.",
    "צוות Agent Hub Guru יחזור אליכם בהקדם האפשרי, בדרך כלל תוך יום עסקים אחד.",
    "",
    "בינתיים, אם תרצו לדבר איתנו מיד, אתם מוזמנים לכתוב לנו בוואטסאפ:",
    "https://wa.me/972505316380",
    "",
    "נתראה בקרוב,",
    "עופר שחר ואור מוסה",
    "Agent Hub Guru AI Engineering",
  ].join("\r\n");

  await sendGmail({
    to: lead.email,
    subject,
    body,
    replyTo: NOTIFY_EMAIL,
  });
  logger.info({ recipient: lead.email }, "lead auto-reply email sent");
}
