import {
  timestamp,
  pgTable,
  text,
  index,
} from "drizzle-orm/pg-core"

export const inviteTokens = pgTable("invite_tokens", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
  usedAt: timestamp("used_at", { mode: "date" }),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
}, (table) => ({
  tokenIdx: index("invite_tokens_token_idx").on(table.token),
  emailIdx: index("invite_tokens_email_idx").on(table.email),
  expiresAtIdx: index("invite_tokens_expires_at_idx").on(table.expiresAt),
}))
