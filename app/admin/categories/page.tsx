import { db } from "@/db/index"
import { categories } from "@/db/schema"
import { createCategory, deleteCategory } from "@/app/admin/categories/actions"
import { desc } from "drizzle-orm"
import EditCategoryModal from "@/app/admin/categories/edit-modal" // 1. Import your new modal
import DeleteButton from "@/app/admin/categories/delete-button"

export default async function CategoriesPage() {
  // READ: Fetch all categories sorted by newest first
  const allCategories = await db.select().from(categories).orderBy(desc(categories.createdAt))

  return (
    <div className="p-6  mx-auto text-left">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 text-left">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900">Category Management</h1>
          <p className="text-sm text-zinc-500">Create and manage your product categories.</p>
        </div>
        <div className="text-xs font-medium bg-zinc-100 text-zinc-600 border border-zinc-200 px-2.5 py-1 rounded-md h-fit w-fit">
          {allCategories.length} Categories
        </div>
      </div>

      {/* CREATE FORM - Neutral LTR Style */}
      <form action={createCategory} className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-white p-5 rounded-lg border border-zinc-200 shadow-sm text-left">
        <div className="md:col-span-1">
          <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1.5 ml-1">Name</label>
          <input 
            name="name" 
            placeholder="Electronics..." 
            className="h-9 border border-zinc-200 px-3 rounded-md w-full bg-zinc-50/50 focus:bg-white focus:ring-1 focus:ring-zinc-400 outline-none text-sm transition-all" 
            required 
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1.5 ml-1">Description</label>
          <input 
            name="description" 
            placeholder="Brief details about the category..." 
            className="h-9 border border-zinc-200 px-3 rounded-md w-full bg-zinc-50/50 focus:bg-white focus:ring-1 focus:ring-zinc-400 outline-none text-sm transition-all" 
          />
        </div>
        <button type="submit" className="h-9 bg-zinc-900 text-white px-4 rounded-md text-xs font-medium hover:bg-zinc-800 transition-all shadow-sm active:scale-[0.98]">
          Add Category
        </button>
      </form>

      {/* TABLE - Neutral LTR Design */}
      <div className="bg-white border border-zinc-200 rounded-md shadow-sm overflow-hidden text-left">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-50/50 text-zinc-500 border-b border-zinc-200">
            <tr>
              <th className="px-4 py-3 font-medium text-[11px] uppercase tracking-wider">Name / Slug</th>
              <th className="px-4 py-3 font-medium text-[11px] uppercase tracking-wider">Description</th>
              <th className="px-4 py-3 font-medium text-[11px] uppercase tracking-wider">Updated</th>
              <th className="px-4 py-3 font-medium text-[11px] uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {allCategories.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-12 text-center text-sm text-zinc-400">
                  No categories found. Start by adding one above.
                </td>
              </tr>
            ) : (
              allCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-zinc-50/30 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-zinc-900">{cat.name}</div>
                    <div className="text-[10px] font-mono text-zinc-400">/{cat.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-zinc-500 text-xs truncate max-w-[200px]">
                    {cat.description || "—"}
                  </td>
                  <td className="px-4 py-3 text-zinc-400 text-[11px]">
                    {/* Date logic as provided in your snippet */}
                    {new Date(cat.updatedAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <EditCategoryModal category={cat} />
                      <DeleteButton id={cat.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}