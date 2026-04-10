import { pgEnum, pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { projects } from "./projects";

export const testimonials = pgTable("testimonials", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  clientId: text("client_id"),
  projectId: text("project_id").references(() => projects.id, { onDelete: "set null" }),
  authorName: text("author_name").notNull(),
  authorRole: text("author_role"),
  feedbackText: text("feedback_text").notNull(),
  rating: integer("rating"),
});
