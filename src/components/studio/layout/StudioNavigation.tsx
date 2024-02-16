"use client"

import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"
import { studioNavItems } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const StudioNavigation = () => {
  const pathName = usePathname()
  return (
    <MaxWidthWrapper>
      <div className="flex items-center border-b">
        <nav className="h-14 flex items-center">
          {studioNavItems.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className={cn(
                "[&:not(:last-child)]:mr-4",
                pathName === item.href && "text-primary"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </MaxWidthWrapper>
  )
}

export default StudioNavigation
