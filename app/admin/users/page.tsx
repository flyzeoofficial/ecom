import { Metadata } from "next"
import { AdminBreadcrumb } from "@/components/admin/breadcrumb"

export const metadata: Metadata = {
  title: "Users | Ecom Admin",
  description: "Manage your store Users",
}

export default function UsersPage() {
  return <div>
    <AdminBreadcrumb />
    Manage your Users here...
    </div>
}