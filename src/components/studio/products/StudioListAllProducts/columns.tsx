"use client"

import { Product } from "@/types/collection"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { cn } from "@/lib/utils"

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => {
      const product = row.original

      return (
        <div className="flex items-center">
          <Image
            src={product.images[0]}
            alt={product.name}
            className="h-10 w-10 rounded-md"
            width={100}
            height={100}
          />
        </div>
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const product = row.original

      // Get first 20 characters of description
      return <div>{product.description?.slice(0, 20)}...</div>
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "sizes",
    header: "Sizes",
  },
  {
    accessorKey: "color",
    header: "Colors",
    cell: ({ row }) => {
      const product = row.original

      const colors: { [key: string]: string } = {
        white: "bg-white",
        black: "bg-black",
        multi: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
        red: "bg-red-500",
        blue: "bg-blue-500",
        green: "bg-green-500",
        yellow: "bg-yellow-500",
        purple: "bg-purple-500",
        pink: "bg-pink-500",
        orange: "bg-orange-500",
        grey: "bg-gray-500",
      }

      const bgColorClass = colors[product?.color] || "bg-gray-400"

      return (
        <div className="flex items-center">
          {product?.color && (
            <div
              className={cn(
                "w-4 h-4 rounded-full border border-gray-200",
                bgColorClass
              )}
            ></div>
          )}
        </div>
      )
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
