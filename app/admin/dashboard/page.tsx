import { Metadata } from "next"
import { AdminBreadcrumb } from "@/components/admin/breadcrumb"

export const metadata: Metadata = {
  title: "Dashboard | Ecom Admin",
  description: "Manage your store products",
}

export default function AdminPage() {
  return <div>
    <AdminBreadcrumb />
    Manage your Dashboard here...
    </div>
}