"use server"

import { db } from "@/db/index"
import { categories } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

// CREATE
export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string

  // Simple slug generator
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with a hyphen
    .replace(/^-+|-+$/g, ''); // Trim hyphens from ends
  
  await db.insert(categories).values({
    name,
    slug,
    description,
  })

  revalidatePath("/backend/categories")
}

// DELETE
export async function deleteCategory(id: string) {
  await db.delete(categories).where(eq(categories.id, id))
  revalidatePath("/backend/categories")
}

export async function updateCategory(id: string, formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  
  const slug = name.toLowerCase().trim().replace(/\s+/g, "-")

  await db.update(categories)
    .set({ name, description, slug })
    .where(eq(categories.id, id))

  revalidatePath("/backend/categories")
}