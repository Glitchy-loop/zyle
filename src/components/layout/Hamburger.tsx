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

interface HamburgerProps {
  navItems: NavItem[]
}

const Hamburger = ({ navItems }: HamburgerProps) => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="link" className="p-0 m-0">
            <AlignJustify className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader className="bg-foreground h-20 flex items-center justify-center mt-4">
            <SheetTitle className="text-secondary uppercase">Zyle</SheetTitle>
          </SheetHeader>
          <div className="mt-20">
            <nav className="flex flex-col uppercase font-semibold text-2xl">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link href={item.href} className="hover:text-primary">
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
