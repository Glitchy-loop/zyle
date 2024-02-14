import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"
import RegistrationForm from "@/components/auth/forms/RegistrationForm"
import { Button } from "@/components/ui/button"
import getSession from "@/hooks/useGetSession"
import Link from "next/link"

const RegisterPage = async () => {
  // Get the session if it exists
  const session = await getSession()

  // If there is a session, redirect to the home page
  if (session) {
    return (
      <div className="mt-8 text-center">
        <div>
          You are currently logged in as{" "}
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
      <RegistrationForm />
    </MaxWidthWrapper>
  )
}

export default RegisterPage
