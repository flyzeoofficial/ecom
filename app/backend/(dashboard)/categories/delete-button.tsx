"use client" // This makes the onClick work!

import { deleteCategory } from "@/app/backend/(dashboard)/categories/actions" 
import { Trash2 } from "lucide-react"

export default function DeleteButton({ id }: { id: string }) {
  return (
    <button 
      onClick={async () => {
        const confirmed = confirm("Are you sure you want to delete this?")
        if (confirmed) {
          await deleteCategory(id)
        }
      }}
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 bg-white shadow-sm hover:bg-zinc-100 hover:text-zinc-900 h-8 px-3 text-red-600"
    >
      <Trash2 className="h-3.5 w-3.5" />
      <span>Delete</span>
    </button>
  )
}