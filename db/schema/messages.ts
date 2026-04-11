import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const messageStatusEnum = pgEnum('message_status', ['UNREAD', 'READ', 'REPLIED']);

export const messages = pgTable("messages", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  whatsappNumber: text("whatsapp_number").notNull(),
  companyName: text("company_name").notNull(),
  industry: text("industry").notNull(),
  serviceRequired: text("service_required").notNull(),
  websiteOrInstagram: text("website_or_instagram"),
  message: text("message"),
  status: messageStatusEnum("status").notNull().default('UNREAD'),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});