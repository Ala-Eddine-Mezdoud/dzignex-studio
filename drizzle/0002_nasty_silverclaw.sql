CREATE TYPE "public"."message_label" AS ENUM('important', 'normal', 'scam');--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "label" "message_label" DEFAULT 'normal';