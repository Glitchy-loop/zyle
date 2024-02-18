"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuth from "@/hooks/useAuth"
import { Session } from "@supabase/supabase-js"
import { LayoutDashboard, LogOut } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "../ThemeToggle"

const UserNav = ({ session }: { session: Session | null }) => {
  const { signOut } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="flex w-8 h-8 justify-center items-center cursor-pointer">
          <AvatarImage
            src={session?.user?.user_metadata.avatar_url ?? ""}
            alt={session?.user?.email ?? ""}
            className="rounded-full w-8 h-8 border-2 border-secondary-foreground/30"
          />
          <AvatarFallback className="uppercase text-sm">
            {session?.user?.email?.[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{session?.user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard">
            <DropdownMenuItem className="cursor-pointer">
              Dashboard
              <DropdownMenuShortcut>
                <LayoutDashboard className="w-4 h-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="px-2 my-2">
          <ThemeToggle />
        </div>
        <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
          Log out
          <DropdownMenuShortcut>
            <LogOut className="w-4 h-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav
