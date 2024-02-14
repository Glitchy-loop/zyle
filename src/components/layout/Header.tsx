import MaxWidthWrapper from "./MaxWidthWrapper"
import Hamburger from "./Hamburger"
import Logo from "../Logo"
import Cart from "./Cart"
import { loginRegisterNavItems, navItems } from "@/lib/constants"
import DesktopNav from "./DesktopNav"
import UserNav from "./UserNav"
import { Session } from "@supabase/supabase-js"
import { Separator } from "../ui/separator"
import LoginRegisterNav from "./LoginRegisterNav"

const Header = ({ session }: { session: Session | null }) => {
  return (
    <header className="border-b sticky top-0 left-0 w-full bg-background">
      <MaxWidthWrapper className="flex h-24 justify-between items-center">
        {/* Left side */}

        <div className="flex-1 justify-start">
          {/* DesktopNav */}
          <DesktopNav navItems={navItems} />
          {/* MobileNav */}
          <Hamburger navItems={navItems} />
        </div>

        {/* Center */}
        <div className="flex-1 justify-center text-center">
          {/* Logo */}
          <Logo />
        </div>

        {/* RightSide */}
        <div className="flex items-center flex-1 justify-end">
          {/* Cart */}
          <Cart />
          <Separator orientation="vertical" className="h-4 w-[2px] mx-4" />
          {/* UserMenu */}
          {session && <UserNav session={session} />}
          {!session && (
            <LoginRegisterNav loginRegisterNavItems={loginRegisterNavItems} />
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  )
}

export default Header
