import { pgEnum, pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { projects } from "./projects";

export const testimonials = pgTable("testimonials", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  projectId: text("project_id").references(() => projects.id, { onDelete: "set null" }),
  authorName: text("author_name").notNull(),
  authorRole: text("author_role"),
  authorCompany: text("author_company"),
  authorAvatarUrl: text("author_avatar_url"),
  feedbackText: text("feedback_text").notNull(),
  statValue: text("stat_value"), // e.g., "+12"
  statLabel: text("stat_label"), // e.g., "Months Partnership"
  rating: integer("rating"),
});
