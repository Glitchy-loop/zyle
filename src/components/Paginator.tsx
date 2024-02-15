"use client"

import React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination"
import Link from "next/link"
import { cn } from "@/lib/utils"

const Paginator = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link key={page} href={createPageURL(page)}>
            <PaginationItem
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9",
                currentPage === page ? "bg-accent" : "text-accent-foreground"
              )}
            >
              {page}
            </PaginationItem>
          </Link>
        ))}
      </PaginationContent>
    </Pagination>
  )
}

export default Paginator
