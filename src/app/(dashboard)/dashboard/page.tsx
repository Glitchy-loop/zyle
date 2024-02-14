"use client"

import useAuth from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"

const DashboardPage = () => {
  const { signOut } = useAuth()
  return (
    <div>
      <div>
        <h1>Dashboard</h1>

        <p>
          This is the dashboard page. You can only see this page if you are
          logged in.
        </p>

        <Button onClick={signOut}>Sign out</Button>
      </div>
    </div>
  )
}

export default DashboardPage
