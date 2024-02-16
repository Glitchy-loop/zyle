"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { usePathname, useSearchParams } from "next/navigation"

const Colors = [
  "blue",
  "red",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "black",
  "white",
]

const ShopFilter = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageUrl = (color: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("color", color)
    return `${pathname}?${params.toString()}`
  }

  const clearFilter = () => {
    const params = new URLSearchParams(searchParams)
    params.delete("color")
    return (window.location.href = `${pathname}?${params.toString()}`)
  }

  return (
    <Drawer>
      <DrawerTrigger asChild className="sticky top-24 w-full">
        <Button variant="outline" className="">
          Filter
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col py-4 px-4 items-center md:items-center">
        <div className="w-full max-w-sm z-10 flex flex-col text-center">
          <DrawerHeader>
            <DrawerTitle className="text-center mt-4">
              Filter products
            </DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-wrap flex-col px-4 mt-5">
            <DrawerDescription className="text-sm text-gray-500 text-center md:text-start">
              Colors
            </DrawerDescription>
            <div className="flex flex-wrap justify-center md:justify-start">
              {Colors.map((color) => (
                <Button
                  key={color}
                  className={cn(
                    `p-0 m-0 bg-${color}-500 border-${color}-200 border-2 hover:bg-${color}-600 hover:border-${color}-400 transition-colors duration-300`,
                    color === "white"
                      ? "bg-white"
                      : color === "black"
                      ? "bg-black"
                      : null,
                    "me-2 mt-2",
                    "w-6",
                    "h-6"
                  )}
                  onClick={() => {
                    window.location.href = createPageUrl(color)
                  }}
                />
              ))}
            </div>
          </div>
          <DrawerFooter className="mt-10">
            <Button variant="default" onClick={() => clearFilter()}>
              Clear
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default ShopFilter
