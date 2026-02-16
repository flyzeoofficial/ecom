import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  // 1. Add the updatedAt column
  updatedAt: timestamp("updated_at")
    .defaultNow() // Sets current time on creation
    .notNull()
    .$onUpdate(() => new Date()), // Automatically updates on every save
});