import nodemailer from "nodemailer";
import { logger } from "./logger.js";
import { LOGO_EMAIL_BASE64 } from "./logoEmail.js";

const NOTIFY_EMAIL = process.env.LEADS_NOTIFY_EMAIL ?? "agenthubguru@gmail.com";
const SMTP_USER = process.env.SMTP_USER ?? "";
const SMTP_PASS = process.env.SMTP_PASS ?? "";

export type LeadNotification = {
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  serviceInterest: string | null;
  message: string | null;
};

function getTransporter() {
  if (!SMTP_USER || !SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendLeadNotification(lead: LeadNotification): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) {
    logger.warn("SMTP credentials not configured — skipping lead notification email");
    return;
  }

  const fields: Array<[string, string | null]> = [
    ["שם", lead.name],
    ["טלפון", lead.phone],
    ["אימייל", lead.email],
    ["חברה", lead.company],
    ["תחום עניין", lead.serviceInterest],
    ["הודעה", lead.message],
  ];

  const textBody = [
    "התקבלה פנייה חדשה דרך טופס יצירת הקשר באתר:",
    "",
    ...fields
      .filter(([, value]) => value && value.trim() !== "")
      .map(([label, value]) => `${label}: ${value}`),
    "",
    "—",
    "Agent Hub Guru AI Engineering",
  ].join("\n");

  await transporter.sendMail({
    from: `"Agent Hub Guru" <${SMTP_USER}>`,
    to: NOTIFY_EMAIL,
    subject: `פנייה חדשה מהאתר: ${lead.name}`,
    text: textBody,
  });

  logger.info({ recipient: NOTIFY_EMAIL }, "lead notification email sent");
}

export async function sendLeadAutoReply(lead: LeadNotification): Promise<void> {
  if (!lead.email || lead.email.trim() === "") return;

  const transporter = getTransporter();
  if (!transporter) {
    logger.warn("SMTP credentials not configured — skipping auto-reply email");
    return;
  }

  const greetingName = lead.name?.trim() ? lead.name.trim() : "שלום";
  const safeName = escapeHtml(greetingName);

  const textBody = [
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
  ].join("\n");

  const htmlBody = `<!DOCTYPE html>
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

  await transporter.sendMail({
    from: `"Agent Hub Guru" <${SMTP_USER}>`,
    to: lead.email,
    replyTo: NOTIFY_EMAIL,
    subject: "קיבלנו את פנייתכם — Agent Hub Guru AI Engineering",
    text: textBody,
    html: htmlBody,
    attachments: [
      {
        filename: "agent-hub-guru.png",
        content: Buffer.from(LOGO_EMAIL_BASE64, "base64"),
        cid: "ahg-logo",
      },
    ],
  });

  logger.info({ recipient: lead.email }, "lead auto-reply email sent");
}
