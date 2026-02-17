import { db } from "./index"; // Adjust this to point to your DB connection file
import { backendUsers, sellers } from "./schema";
import bcrypt from "bcryptjs";

async function main() {
  console.log("--- Seeding Database ---");

  // 1. Create an Admin (Backend)
  const adminPassword = await bcrypt.hash("admin123", 10);
  await db.insert(backendUsers).values({
    email: "admin@example.com",
    password: adminPassword,
    role: "admin",
  });
  console.log("✅ Admin created: admin@example.com / admin123");

  // 2. Create a Staff member (Backend)
  const staffPassword = await bcrypt.hash("staff123", 10);
  await db.insert(backendUsers).values({
    email: "staff@example.com",
    password: staffPassword,
    role: "staff",
  });
  console.log("✅ Staff created: staff@example.com / staff123");

  // 3. Create a Seller
  const sellerPassword = await bcrypt.hash("seller123", 10);
  await db.insert(sellers).values({
    email: "seller@shop.com",
    password: sellerPassword,
    shopName: "My Awesome Store",
  });
  console.log("✅ Seller created: seller@shop.com / seller123");

  console.log("--- Seeding Completed ---");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});