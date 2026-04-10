import { pgEnum, pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const messageStatusEnum = pgEnum('message_status', ['UNREAD', 'READ', 'REPLIED']);

export const messages = pgTable("messages", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  senderName: text("sender_name").notNull(),
  senderEmail: text("sender_email").notNull(),
  subject: text("subject"),
  body: text("body").notNull(),
  status: messageStatusEnum("status").notNull().default('UNREAD'),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});