CREATE TYPE "public"."message_status" AS ENUM('UNREAD', 'READ', 'REPLIED');--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"phone" text,
	"password" text,
	"emailVerified" timestamp,
	"image" text,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"acknowledged" boolean DEFAULT false,
	"session_version" integer DEFAULT 1 NOT NULL,
	"banned" boolean DEFAULT false NOT NULL,
	"banned_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_detail_images" (
	"id" text PRIMARY KEY NOT NULL,
	"detail_id" text NOT NULL,
	"image_url" text NOT NULL,
	"alt_text" text,
	"order_index" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_details" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"label" text NOT NULL,
	"description" text,
	"order_index" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"summary" text,
	"description" text,
	"category" text,
	"services" text[],
	"thumbnail_url" text,
	"client_name" text,
	"is_published" boolean DEFAULT false NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" text PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"whatsapp_number" text NOT NULL,
	"company_name" text NOT NULL,
	"industry" text NOT NULL,
	"service_required" text NOT NULL,
	"website_or_instagram" text,
	"message" text,
	"status" "message_status" DEFAULT 'UNREAD' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text,
	"author_name" text NOT NULL,
	"author_role" text,
	"author_company" text,
	"author_avatar_url" text,
	"feedback_text" text NOT NULL,
	"stat_value" text,
	"stat_label" text,
	"rating" integer
);
--> statement-breakpoint
CREATE TABLE "media_assets" (
	"id" text PRIMARY KEY NOT NULL,
	"file_name" text NOT NULL,
	"s3_url" text NOT NULL,
	"file_type" text,
	"size_bytes" integer,
	"uploaded_by" text
);
--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_detail_images" ADD CONSTRAINT "project_detail_images_detail_id_project_details_id_fk" FOREIGN KEY ("detail_id") REFERENCES "public"."project_details"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_details" ADD CONSTRAINT "project_details_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;