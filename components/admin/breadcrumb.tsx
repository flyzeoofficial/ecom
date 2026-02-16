"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"
import { Home } from "lucide-react"

export function AdminBreadcrumb() {
  const pathname = usePathname()
  
  // 1. Get segments, but filter out 'admin' so we don't have Admin > Dashboard
  const pathSegments = pathname.split("/").filter(Boolean).filter(s => s !== 'admin')

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {/* ALWAYS SHOW DASHBOARD FIRST */}
        <BreadcrumbItem>
          {pathname === "/admin/dashboard" ? (
            <BreadcrumbPage className="text-xs flex items-center gap-1 font-semibold">
              <Home className="size-3.5" /> Dashboard
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href="/admin/dashboard" className="text-xs flex items-center gap-1 hover:text-blue-600">
                <Home className="size-3.5" /> Dashboard
              </Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {/* RENDER THE REST OF THE PATH */}
        {pathSegments.map((segment, index) => {
          // Build the href carefully based on segments
          const href = `/admin/${pathSegments.slice(0, index + 1).join("/")}`
          const isLast = index === pathSegments.length - 1
          const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ")

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-xs font-semibold text-foreground">
                    {title}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href} className="hover:text-blue-600 transition-colors">
                      {title}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}