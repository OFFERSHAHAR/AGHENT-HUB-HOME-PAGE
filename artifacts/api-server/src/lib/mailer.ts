// Gmail integration (Replit connector "google-mail").
// Sends a notification email for each new lead via the Gmail API proxy.
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

  const message = [
    `To: ${NOTIFY_EMAIL}`,
    `Subject: ${encodeHeader(subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    Buffer.from(body, "utf-8").toString("base64"),
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

  logger.info({ recipient: NOTIFY_EMAIL }, "lead notification email sent");
}
