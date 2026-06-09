import { pgTable, serial, text, timestamp, check } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";
import { z } from "zod/v4";

export const leadsTable = pgTable(
  "leads",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone"),
    company: text("company"),
    serviceInterest: text("service_interest"),
    message: text("message"),
    status: text("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    check(
      "leads_status_check",
      sql`${table.status} in ('new', 'contacted', 'won', 'lost')`,
    ),
  ],
);

export const insertLeadSchema = createInsertSchema(leadsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leadsTable.$inferSelect;
