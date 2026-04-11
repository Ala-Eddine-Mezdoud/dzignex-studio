import { pgEnum, pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  summary: text("summary"),
  description: text("description"),
  category: text("category"),
  services: text("services").array(),
  thumbnailUrl: text("thumbnail_url"),
  clientName: text("client_name"),
  isPublished: boolean("is_published").notNull().default(false),
});

export const projectDetails = pgTable("project_details", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  description: text("description"),
  orderIndex: integer("order_index").notNull().default(0),
  // imageUrl removed — images now live in projectDetailImages
});

export const projectDetailImages = pgTable("project_detail_images", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  detailId: text("detail_id")
    .notNull()
    .references(() => projectDetails.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  altText: text("alt_text"),
  orderIndex: integer("order_index").notNull().default(0),
});