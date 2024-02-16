"use client"

import React from "react"
import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { AlignJustify } from "lucide-react"
import Link from "next/link"
import { NavItem } from "@/types"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Separator } from "../ui/separator"

interface HamburgerProps {
  navItems: NavItem[]
}

const Hamburger = ({ navItems }: HamburgerProps) => {
  const pathName = usePathname()
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="link" className="p-0 m-0">
            <AlignJustify className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="flex flex-col">
          <SheetHeader className="h-20 flex items-center justify-center mt-4">
            <SheetTitle className="text-4xl text-muted-foreground uppercase tracking-widest text-start">
              Zyle
            </SheetTitle>
          </SheetHeader>
          <Separator className="my-5" />
          <div>
            <nav className="flex flex-col uppercase font-semibold text-4xl justify-center items-center">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "hover:text-primary transition-colors duration-300 ease-in-out py-2",
                      pathName === item.href ? "text-primary" : ""
                    )}
                  >
                    {item.name}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Hamburger
