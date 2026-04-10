import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { users } from "./user";

export const roleEnum = pgEnum("role", [
  "ADMIN",
  "USER",
]);

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  fullName: text("full_name").notNull(),
  role: roleEnum("role").notNull(),
  acknowledged: boolean("acknowledged").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  email: text("email").unique(),
  phone: text("phone"),
});

  