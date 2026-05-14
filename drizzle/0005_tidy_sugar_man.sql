ALTER TABLE "messages" ALTER COLUMN "service_required" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "service_required" SET DEFAULT ARRAY[]::text[];--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "challenges" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "challenges" SET DEFAULT ARRAY[]::text[];--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "main_goal" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "main_goal" SET DEFAULT ARRAY[]::text[];