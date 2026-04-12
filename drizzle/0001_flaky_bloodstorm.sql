CREATE TABLE "invite_tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"used_at" timestamp,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "invite_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'USER';--> statement-breakpoint
CREATE INDEX "invite_tokens_token_idx" ON "invite_tokens" USING btree ("token");--> statement-breakpoint
CREATE INDEX "invite_tokens_email_idx" ON "invite_tokens" USING btree ("email");--> statement-breakpoint
CREATE INDEX "invite_tokens_expires_at_idx" ON "invite_tokens" USING btree ("expires_at");