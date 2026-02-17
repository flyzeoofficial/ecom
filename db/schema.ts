import { pgTable, uuid, text, timestamp, serial, varchar, pgEnum } from "drizzle-orm/pg-core";

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

export const adminRoleEnum = pgEnum("admin_role", ["admin", "staff"]);

export const backendUsers = pgTable("backend_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  role: adminRoleEnum("role").default("staff").notNull(),
});

export const sellers = pgTable("sellers", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  shopName: text("shop_name").notNull(),
});