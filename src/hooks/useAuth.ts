"use client"

import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface AuthValues {
  email: string
  password: string
}

const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  // Register user
  // const register = async (values: AuthValues) => {
  //   try {
  //     setLoading(true)

  //     const response = await axios.post("/api/auth/sign-up", values)

  //     // Check for success status
  //     if (response.status === 200) {
  //       return {
  //         success: true,
  //         data: response.data,
  //       }
  //     } else {
  //       return {
  //         success: false,
  //         error: response.data.message || "Registration failed",
  //       }
  //     }
  //   } catch (error: any) {
  //     console.error(error)
  //     return {
  //       success: false,
  //       error: error.message || `Something went wrong... Please try again`,
  //     }
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // login user
  // const login = async (values: AuthValues) => {
  //   try {
  //     setLoading(true)

  //     const response = await axios.post("/api/auth/sign-in", values)

  //     // Check for success status
  //     if (response.status === 200) {
  //       return {
  //         success: true,
  //         data: response.data,
  //       }
  //     } else {
  //       return {
  //         success: false,
  //         error: response.data.message || "Login failed",
  //       }
  //     }
  //   } catch (error: any) {
  //     console.error(error)
  //     return {
  //       success: false,
  //       error:
  //         error.response?.data.message ||
  //         `Something went wrong... Please try again`,
  //     }
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // Sign out user
  const signOut = () => {
    try {
      // Axios request to register user
      const logoutPromise = new Promise((resolve, reject) => {
        axios
          .post("/api/auth/sign-out")
          .then((response) => {
            // Check for success status
            if (response.status === 200) {
              resolve(response.data) // Resolve with the response data
            } else {
              reject(response.data.message || "Logout failed") // Reject with the error message
            }
          })
          .catch((error) => {
            reject(error.response.data.message || "Logout failed") // Reject with the error message from the response
          })
      })

      toast.promise(logoutPromise, {
        loading: "Logging out...",
        success: () => {
          router.push("/login")
          router.refresh()
          setLoading(false)
          return "Logged out successful"
        },
        error: (error) => {
          console.error(error)
          setLoading(false)
          return `${error}`
        },
      })
    } catch (error) {
      // Handle errors
      console.error(error)
      toast.error("Something went wrong... Please try again")
    }
  }

  // Login with google
  const handleLoginWithGoogle = async () => {
    try {
      setLoading(true)

      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_WEB_URL}/api/auth/callback`,
        },
      })

      setLoading(false)
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong... Please try again")
      setLoading(false)
    }
  }

  return {
    // register,
    // login,
    signOut,
    loading,
    handleLoginWithGoogle,
  }
}

export default useAuth
