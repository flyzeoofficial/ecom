import { Metadata } from "next"
import { AdminBreadcrumb } from "@/components/admin/breadcrumb"

export const metadata: Metadata = {
  title: "Settings | Ecom Admin",
  description: "Manage your store Settings",
}

export default function SettingsPage() {
  return <div>
    <AdminBreadcrumb />
    Manage your Settings here...
    </div>
}