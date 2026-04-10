import { pgEnum, pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";


export const projects = pgTable("projects", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  clientId: text("client_id"),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  summary: text("summary"),
  description: text("description"),
  category: text("category"), // e.g., "Brand Identity", "Web Development"
  thumbnailUrl: text("thumbnail_url"),
  isPublished: boolean("is_published").notNull().default(false),
  completionDate: timestamp("completion_date", { mode: "date" }),
});

export const projectDetails = pgTable("project_details", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  label: text("label").notNull(), // e.g., "design process", "Colors System"
  description: text("description"),
  orderIndex: integer("order_index").notNull().default(0), // to maintain order of details
});