import { pgEnum, pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { testimonials } from "./testimonials";

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

export const projectRelations = relations(projects, ({ many, one }) => ({
  details: many(projectDetails),
  testimonial: one(testimonials, {
    fields: [projects.id],
    references: [testimonials.projectId],
  }),
}));

export const projectDetailRelations = relations(projectDetails, ({ one, many }) => ({
  project: one(projects, {
    fields: [projectDetails.projectId],
    references: [projects.id],
  }),
  images: many(projectDetailImages),
}));

export const projectDetailImageRelations = relations(projectDetailImages, ({ one }) => ({
  detail: one(projectDetails, {
    fields: [projectDetailImages.detailId],
    references: [projectDetails.id],
  }),
}));