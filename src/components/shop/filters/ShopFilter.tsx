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
import { supabase } from "@/lib/supabase/supabase-client"
import { cn } from "@/lib/utils"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const ShopFilter = () => {
  const [colors, setColors] = useState([] as string[])
  const [genders, setGenders] = useState([] as string[])
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const getColors = async () => {
    const { data, error } = await supabase.from("products").select("color")

    // Use type assertion to inform TypeScript about the structure of data
    const flattenedColors = (
      data as unknown as { color: string | string[] }[]
    ).flatMap((item) => (Array.isArray(item.color) ? item.color : [item.color]))

    // Remove duplicates
    const uniqueColors = Array.from(new Set(flattenedColors))

    setColors(uniqueColors)
  }

  const getGenders = async () => {
    try {
      const { data, error } = await supabase.from("products").select("gender")

      if (error) {
        console.error("Error fetching genders:", error.message)
        return
      }

      // Extract the "gender" property from each object
      //   @ts-ignore
      const genders = data.map((item) => item.gender)

      // Remove duplicates
      const uniqueGenders = Array.from(new Set(genders))

      setGenders(uniqueGenders)
    } catch (error) {
      console.error("Error in getGenders:", error)
    }
  }

  useEffect(() => {
    getColors()
    getGenders()
  }, [])

  const createPageUrl = (filterKey: string, filterValue: string) => {
    const params = new URLSearchParams(searchParams)
    params.set(filterKey, filterValue)
    return `${pathname}?${params.toString()}`
  }

  const clearFilter = () => {
    const params = new URLSearchParams(searchParams)
    params.delete("color")
    params.delete("gender")
    return (window.location.href = `${pathname}?${params.toString()}`)
  }

  const params = new URLSearchParams(searchParams)

  return (
    <Drawer>
      <DrawerTrigger asChild className="sticky top-24 w-full">
        <Button variant="outline" className="">
          Filter
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex py-4 px-4 items-center md:items-center">
        <div className="w-full max-w-sm z-10 flex flex-col text-center">
          <DrawerHeader>
            <DrawerTitle className="text-center mt-4">
              Filter products
            </DrawerTitle>
          </DrawerHeader>
          <div className="grid grid-cols-2 space-4 px-4 mt-5">
            {/* Color */}
            <div>
              <DrawerDescription className="text-sm text-gray-500 text-center md:text-start mb-4">
                Colors
              </DrawerDescription>
              <div className="flex flex-wrap justify-center md:justify-start">
                {colors.map((color) => (
                  <Button
                    key={color}
                    className={cn(
                      color &&
                        `p-0 m-0 bg-${color}-500 border-${color}-200 border-2 hover:bg-${color}-600 hover:border-${color}-400 transition-colors duration-300`,
                      color === "white"
                        ? "bg-white"
                        : color === "black"
                        ? "bg-black"
                        : null,
                      "me-2",
                      "w-6",
                      "h-6",
                      params.get("color") === color &&
                        "border-secondary-foreground border-2 border-solid"
                    )}
                    onClick={() => {
                      window.location.href = createPageUrl("color", color)
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Gender */}
            <div>
              <DrawerDescription className="text-sm text-gray-500 text-center md:text-start mb-4">
                Gender
              </DrawerDescription>
              <div className="flex flex-wrap justify-center md:justify-start">
                {genders.map((gender, index) => (
                  <Button
                    key={index}
                    disabled={params.get("gender") === gender}
                    className={cn(
                      "me-2",
                      params.get("gender") === gender &&
                        "border-secondary-foreground border-2 border-solid bg-secondary transition-colors duration-300 hover:bg-secondary disabled:opacity-1"
                    )}
                    onClick={() => {
                      window.location.href = createPageUrl("gender", gender)
                    }}
                  >
                    {gender}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DrawerFooter className="mt-10">
            <DrawerClose asChild>
              <Button variant="default" onClick={() => clearFilter()}>
                Clear
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default ShopFilter
