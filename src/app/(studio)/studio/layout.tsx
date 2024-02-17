import BreadCrumb from "@/components/BreadCrumbs"
import LoginForm from "@/components/auth/forms/LoginForm"
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"
import StudioNavigation from "@/components/layout/StudioNavigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { DoorClosed } from "lucide-react"
import { Metadata } from "next"
import { cookies } from "next/headers"

export const metadata: Metadata = {
  title: "Zyle online store",
  description: "Zyle e-commerce store. Buy your favorite products online.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Fetch user data from the database using the session user ID
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", session?.user?.id)

  // Check if logged in
  if (!session) {
    return (
      <div className="text-center mt-10 flex justify-center flex-col">
        <h1 className="text-2xl">Studio</h1>
        <LoginForm />
      </div>
    )
  }

  // Check if user is admin
  const isAdmin =
    userData && userData.length > 0 && userData[0].role === "admin"

  // If user is not admin, show unauthorized message
  if (!isAdmin) {
    return (
      <div className="text-center mt-10 flex justify-center flex-col">
        <h1 className="text-2xl">Unauthorized</h1>
        <p className="mt-2 text-muted-foreground">
          You are not authorized to access this page.
        </p>
      </div>
    )
  }

  // Merge additional user data from the database into session.user
  const mergedSession = session?.user
    ? { ...session, user: { ...session.user, ...userData } }
    : null

  return (
    <main className="min-h-screen">
      <StudioNavigation />
      <MaxWidthWrapper className="my-10">{children}</MaxWidthWrapper>
    </main>
  )
}
