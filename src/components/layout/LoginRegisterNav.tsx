"use client"

import { cn } from "@/lib/utils"
import { LoginRegisterNav } from "@/types"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface LoginRegisterNavProps {
  loginRegisterNavItems: LoginRegisterNav[] // Add the missing property
}

const LoginRegisterNav = ({ loginRegisterNavItems }: LoginRegisterNavProps) => {
  const pathname = usePathname()
  return (
    <nav className="hidden md:block">
      <ul className="flex uppercase text-xs">
        {loginRegisterNavItems.map((item, index) => (
          <div
            key={index}
            className="[&:not(:last-child)]:mr-4 flex items-center justify-center"
          >
            <div
              className={cn(
                "relative cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-primary before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:-bottom-1 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-primary after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:-bottom-1 after:right-[50%]",
                pathname === item.href && "before:w-[50%] after:w-[50%]"
              )}
            >
              <Link
                key={index}
                className="hover:text-primary transition-colors duration-300 ease-in-out relative"
                href={item.href}
              >
                {item.name}
              </Link>
            </div>
          </div>
        ))}
      </ul>
    </nav>
  )
}

export default LoginRegisterNav
