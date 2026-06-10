// Gmail integration (Replit connector "google-mail").
// Sends a notification email for each new lead via the Gmail API proxy,
// and an automatic confirmation reply to the customer who submitted the form.
import { ReplitConnectors } from "@replit/connectors-sdk";
import { logger } from "./logger.js";
import { LOGO_EMAIL_BASE64 } from "./logoEmail.js";

const connectors = new ReplitConnectors();

const NOTIFY_EMAIL = process.env.LEADS_NOTIFY_EMAIL ?? "agenthubguru@agenthub.guru";

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

// Wrap base64 to 76-char lines (RFC 2045) so MIME parts stay within line-length limits.
function wrap76(b64: string): string {
  return b64.replace(/\s+/g, "").replace(/(.{76})/g, "$1\r\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type InlineImage = { cid: string; base64: string; mime: string; filename: string };

async function sendGmail(opts: {
  to: string;
  subject: string;
  body: string;
  html?: string;
  replyTo?: string;
  inlineImage?: InlineImage;
}): Promise<void> {
  const topHeaders = [
    `To: ${opts.to}`,
    `Subject: ${encodeHeader(opts.subject)}`,
    "MIME-Version: 1.0",
  ];
  if (opts.replyTo) {
    topHeaders.push(`Reply-To: ${opts.replyTo}`);
  }

  let message: string;

  if (opts.html) {
    const altBoundary = `alt_${Date.now().toString(36)}`;
    const textPart = [
      `--${altBoundary}`,
      'Content-Type: text/plain; charset="UTF-8"',
      "Content-Transfer-Encoding: base64",
      "",
      wrap76(Buffer.from(opts.body, "utf-8").toString("base64")),
    ];
    const htmlPart = [
      `--${altBoundary}`,
      'Content-Type: text/html; charset="UTF-8"',
      "Content-Transfer-Encoding: base64",
      "",
      wrap76(Buffer.from(opts.html, "utf-8").toString("base64")),
    ];
    const altSection = [
      `Content-Type: multipart/alternative; boundary="${altBoundary}"`,
      "",
      ...textPart,
      ...htmlPart,
      `--${altBoundary}--`,
    ];

    if (opts.inlineImage) {
      const relBoundary = `rel_${Date.now().toString(36)}`;
      message = [
        ...topHeaders,
        `Content-Type: multipart/related; boundary="${relBoundary}"`,
        "",
        `--${relBoundary}`,
        ...altSection,
        `--${relBoundary}`,
        `Content-Type: ${opts.inlineImage.mime}`,
        "Content-Transfer-Encoding: base64",
        `Content-ID: <${opts.inlineImage.cid}>`,
        `Content-Disposition: inline; filename="${opts.inlineImage.filename}"`,
        "",
        wrap76(opts.inlineImage.base64),
        `--${relBoundary}--`,
      ].join("\r\n");
    } else {
      message = [...topHeaders, ...altSection].join("\r\n");
    }
  } else {
    message = [
      ...topHeaders,
      'Content-Type: text/plain; charset="UTF-8"',
      "Content-Transfer-Encoding: base64",
      "",
      wrap76(Buffer.from(opts.body, "utf-8").toString("base64")),
    ].join("\r\n");
  }

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

  const safeName = escapeHtml(greetingName);
  const html = `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;">
          <tr>
            <td style="padding:36px 32px 12px;text-align:center;">
              <img src="cid:ahg-logo" alt="Agent Hub Guru AI Engineering" width="260" style="display:inline-block;width:260px;max-width:80%;height:auto;" />
            </td>
          </tr>
          <tr>
            <td style="padding:8px 36px 32px;direction:rtl;text-align:right;color:#1e293b;font-size:16px;line-height:1.7;">
              <p style="margin:0 0 16px;font-size:19px;font-weight:bold;color:#0f172a;">שלום ${safeName},</p>
              <p style="margin:0 0 14px;">תודה שפניתם אלינו! קיבלנו את פנייתכם ואנחנו שמחים על ההתעניינות.</p>
              <p style="margin:0 0 20px;">צוות Agent Hub Guru יחזור אליכם בהקדם האפשרי, בדרך כלל תוך יום עסקים אחד.</p>
              <p style="margin:0 0 18px;">בינתיים, אם תרצו לדבר איתנו מיד, אתם מוזמנים לכתוב לנו בוואטסאפ:</p>
              <p style="margin:0 0 28px;text-align:center;">
                <a href="https://wa.me/972505316380" style="display:inline-block;background-color:#558BF6;color:#ffffff;text-decoration:none;font-weight:bold;padding:13px 30px;border-radius:10px;font-size:16px;">דברו איתנו בוואטסאפ</a>
              </p>
              <p style="margin:0;color:#475569;">
                נתראה בקרוב,<br />
                עופר שחר ואור מוסה<br />
                <strong style="color:#1e293b;">Agent Hub Guru AI Engineering</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  await sendGmail({
    to: lead.email,
    subject,
    body,
    html,
    replyTo: NOTIFY_EMAIL,
    inlineImage: {
      cid: "ahg-logo",
      base64: LOGO_EMAIL_BASE64,
      mime: "image/png",
      filename: "agent-hub-guru.png",
    },
  });
  logger.info({ recipient: lead.email }, "lead auto-reply email sent");
}
