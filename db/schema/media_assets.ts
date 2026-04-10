import { pgTable, text, integer } from "drizzle-orm/pg-core";
import { users } from "./user";

export const mediaAssets = pgTable("media_assets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  fileName: text("file_name").notNull(),
  s3Url: text("s3_url").notNull(),
  fileType: text("file_type"),
  sizeBytes: integer("size_bytes"),
  uploadedBy: text("uploaded_by").references(() => users.id, { onDelete: "set null" }),
});
