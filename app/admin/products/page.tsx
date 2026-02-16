import { Metadata } from "next"
import { AdminBreadcrumb } from "@/components/admin/breadcrumb"

export const metadata: Metadata = {
  title: "Products | Ecom Admin",
  description: "Manage your store products",
}

export default function ProductsPage() {
  return <div>
    <AdminBreadcrumb />
    Manage your Products here...
    </div>
}