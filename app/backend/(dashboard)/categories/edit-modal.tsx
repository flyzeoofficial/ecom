"use client"

import { useState } from "react"
import { updateCategory } from "@/app/backend/(dashboard)/categories/actions" 
import { Pencil } from "lucide-react"

export default function EditCategoryModal({ category }: { category: any }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 bg-white shadow-sm hover:bg-zinc-100 hover:text-zinc-900 h-8 px-3 text-zinc-600"
      >
        <Pencil className="h-3.5 w-3.5" />
        <span>Edit</span>
      </button>
    )
  }

  return (
  <div className="fixed inset-0 bg-zinc-950/50 backdrop-blur-sm flex items-center justify-center z-50 text-left">
    <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg border border-zinc-200 animate-in fade-in zoom-in duration-200">
      {/* Header aligned Left */}
      <h2 className="text-sm font-semibold text-zinc-900 mb-1 text-left">Edit Category</h2>
      <p className="text-xs text-zinc-500 mb-6 text-left">Update the category details below.</p>
      
      <form action={async (formData) => {
        await updateCategory(category.id, formData);
        setIsOpen(false);
      }}>
        <div className="space-y-4">
          {/* Label and Input aligned Left */}
          <div className="text-left">
            <label className="block text-[11px] font-bold uppercase text-zinc-500 mb-1.5 tracking-tight">
              Name
            </label>
            <input 
              name="name" 
              defaultValue={category.name}
              className="w-full text-sm border border-zinc-200 p-2 rounded-md bg-zinc-50/50 focus:bg-white focus:ring-1 focus:ring-zinc-400 outline-none transition-all" 
              required 
            />
          </div>

          <div className="text-left">
            <label className="block text-[11px] font-bold uppercase text-zinc-500 mb-1.5 tracking-tight">
              Description
            </label>
            <textarea 
              name="description" 
              defaultValue={category.description}
              rows={3}
              className="w-full text-sm border border-zinc-200 p-2 rounded-md bg-zinc-50/50 focus:bg-white focus:ring-1 focus:ring-zinc-400 outline-none transition-all resize-none" 
            />
          </div>
        </div>

        {/* Buttons pushed to the Right (Standard LTR Dashboard layout) */}
        <div className="flex justify-end gap-2 mt-8">
          <button 
            type="button" 
            onClick={() => setIsOpen(false)}
            className="h-8 px-3 text-xs font-medium text-zinc-600 hover:bg-zinc-100 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="h-8 px-4 text-xs font-medium bg-zinc-900 text-white rounded-md hover:bg-zinc-800 transition-colors shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
)
}