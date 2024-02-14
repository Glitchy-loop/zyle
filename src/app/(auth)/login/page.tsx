import LoginForm from "@/components/auth/forms/LoginForm"
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import getSession from "@/hooks/useGetSession"
import Link from "next/link"

const LoginPage = async () => {
  // Get the session if it exists
  const session = await getSession()

  // If there is a session, display the user's email and a link to the home page
  if (session) {
    return (
      <div className="mt-8 text-center">
        <div>
          You are currently logged in as
          <span className="italic">{session?.user?.email}</span>.
        </div>
        <Button className="mt-4">
          <Link href="/">Home</Link>
        </Button>
      </div>
    )
  }

  return (
    <MaxWidthWrapper>
      <LoginForm />
    </MaxWidthWrapper>
  )
}

export default LoginPage
