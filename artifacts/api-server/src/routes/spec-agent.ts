import { Router, type IRouter } from "express";
import { db, leadsTable } from "@workspace/db";

const router: IRouter = Router();

const GROQ_API_KEY = process.env.GROQ_API_KEY ?? "";
const GROQ_MODEL = "llama-3.3-70b-versatile";
const N8N_SPEC_WEBHOOK = process.env.N8N_SPEC_WEBHOOK_URL ?? "";

router.post("/spec-agent/message", async (req, res) => {
  const { messages = [], systemPrompt } = req.body as {
    messages: { role: string; content: string }[];
    systemPrompt: string;
  };

  if (!GROQ_API_KEY) {
    res.status(500).json({ error: "GROQ_API_KEY not configured" });
    return;
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    req.log.error({ err }, "GROQ API error");
    res.status(502).json({ error: "AI service error" });
    return;
  }

  const data = (await response.json()) as { choices: { message: { content: string } }[] };
  const content = data.choices[0]?.message?.content ?? "";
  res.json({ content });
});

router.post("/spec-agent/submit", async (req, res) => {
  const { conversation, summary } = req.body as {
    conversation: { role: string; content: string }[];
    summary: string;
  };

  // Extract name from conversation (first user message typically has name)
  const firstUserMsg = conversation.find((m) => m.role === "user")?.content ?? "";
  const name = firstUserMsg.slice(0, 60) || "לקוח איפיון";

  const [lead] = await db
    .insert(leadsTable)
    .values({
      name,
      message: summary,
      serviceInterest: "spec-agent",
      status: "new",
    })
    .returning();

  // Forward to n8n if configured
  if (N8N_SPEC_WEBHOOK) {
    fetch(N8N_SPEC_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId: lead.id, conversation, summary }),
    }).catch((err) => req.log.error({ err }, "n8n webhook failed"));
  }

  res.json({ success: true, leadId: lead.id });
});

export default router;
