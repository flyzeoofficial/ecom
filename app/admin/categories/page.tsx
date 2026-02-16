import { db } from "@/db/index"
import { categories } from "@/db/schema"
import { createCategory, deleteCategory } from "@/app/admin/categories/actions"
import { desc } from "drizzle-orm"

export default async function CategoriesPage() {
  // READ: Fetch all categories sorted by newest first
  const allCategories = await db.select().from(categories).orderBy(desc(categories.createdAt))

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>

      {/* CREATE FORM */}
      <form action={createCategory} className="mb-8 flex gap-4 bg-gray-50 p-4 rounded-lg">
        <input 
          name="name" 
          placeholder="Category Name" 
          className="border p-2 rounded w-full" 
          required 
        />
        <input 
          name="description" 
          placeholder="Description (Optional)" 
          className="border p-2 rounded w-full" 
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allCategories.map((cat) => (
              <tr key={cat.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{cat.name}</td>
                <td className="p-4 text-gray-600">{cat.description}</td>
                <td className="p-4 text-right">
                  <form action={deleteCategory.bind(null, cat.id)}>
                    <button className="text-red-500 hover:underline">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}