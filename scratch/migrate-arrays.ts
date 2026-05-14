import * as dotenv from "dotenv";
dotenv.config();
import { drizzle } from "drizzle-orm/neon-http";
import { sql } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

async function migrate() {
  console.log("🔄 Manually converting columns to arrays...");
  try {
    await db.execute(sql`
      ALTER TABLE "messages" 
      ALTER COLUMN "service_required" TYPE text[] USING ARRAY[service_required],
      ALTER COLUMN "challenges" TYPE text[] USING string_to_array(challenges, ', '),
      ALTER COLUMN "main_goal" TYPE text[] USING string_to_array(main_goal, ', ');
    `);
    console.log("✅ Columns converted successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  }
  process.exit(0);
}

migrate();
