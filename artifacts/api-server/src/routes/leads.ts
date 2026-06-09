import { Router, type IRouter } from "express";
import { desc, eq, gte, sql } from "drizzle-orm";
import { db, leadsTable } from "@workspace/db";
import {
  CreateLeadBody,
  UpdateLeadBody,
  UpdateLeadParams,
  DeleteLeadParams,
} from "@workspace/api-zod";
import type { Lead } from "@workspace/db";

const router: IRouter = Router();

function serialize(lead: Lead) {
  return {
    id: lead.id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    serviceInterest: lead.serviceInterest,
    message: lead.message,
    status: lead.status,
    createdAt: lead.createdAt.toISOString(),
  };
}

router.get("/leads/stats", async (_req, res) => {
  const rows = await db
    .select({ status: leadsTable.status, count: sql<number>`count(*)::int` })
    .from(leadsTable)
    .groupBy(leadsTable.status);

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recent = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(leadsTable)
    .where(gte(leadsTable.createdAt, sevenDaysAgo));

  const byStatus = (s: string) =>
    rows.find((r) => r.status === s)?.count ?? 0;
  const total = rows.reduce((acc, r) => acc + r.count, 0);

  res.json({
    total,
    new: byStatus("new"),
    contacted: byStatus("contacted"),
    won: byStatus("won"),
    lost: byStatus("lost"),
    last7Days: recent[0]?.count ?? 0,
  });
});

router.get("/leads", async (_req, res) => {
  const rows = await db
    .select()
    .from(leadsTable)
    .orderBy(desc(leadsTable.createdAt));
  res.json(rows.map(serialize));
});

router.post("/leads", async (req, res) => {
  const parsed = CreateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  const [created] = await db
    .insert(leadsTable)
    .values({
      name: parsed.data.name,
      email: parsed.data.email ?? null,
      phone: parsed.data.phone ?? null,
      company: parsed.data.company ?? null,
      serviceInterest: parsed.data.serviceInterest ?? null,
      message: parsed.data.message ?? null,
    })
    .returning();

  res.status(201).json(serialize(created));
});

router.patch("/leads/:id", async (req, res) => {
  const params = UpdateLeadParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const parsed = UpdateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  const updates: Partial<typeof leadsTable.$inferInsert> = {};
  if (parsed.data.status !== undefined) updates.status = parsed.data.status;
  if (parsed.data.message !== undefined) updates.message = parsed.data.message;

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ error: "No fields to update" });
    return;
  }

  const [updated] = await db
    .update(leadsTable)
    .set(updates)
    .where(eq(leadsTable.id, params.data.id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }

  res.json(serialize(updated));
});

router.delete("/leads/:id", async (req, res) => {
  const params = DeleteLeadParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [deleted] = await db
    .delete(leadsTable)
    .where(eq(leadsTable.id, params.data.id))
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }

  res.status(204).end();
});

export default router;
