import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum
} from "drizzle-orm/pg-core"



export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  password: text("password"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: text("role").$type<"ADMIN" | "USER">().notNull().default("USER"),
  acknowledged: boolean("acknowledged").default(false),

  // Session versioning for force logout
  sessionVersion: integer("session_version").notNull().default(1),
  // Ban system fields
  banned: boolean("banned").notNull().default(false),
  bannedAt: timestamp("banned_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  
})


export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
)

