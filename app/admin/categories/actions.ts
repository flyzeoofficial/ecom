"use server"

import { db } from "@/db/index"
import { categories } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

// CREATE
export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  
  await db.insert(categories).values({
    name,
    description,
  })

  revalidatePath("/admin/categories")
}

// DELETE
export async function deleteCategory(id: string) {
  await db.delete(categories).where(eq(categories.id, id))
  revalidatePath("/admin/categories")
}