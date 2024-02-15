"use client"

import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { Separator } from "../../ui/separator"
import { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import useAuth from "../../../hooks/useAuth"
import axios from "axios"

const formSchema = z
  .object({
    email: z.string().email().min(4, {
      message: "Email must be at least 4 characters.",
    }),
    password: z.string().min(6),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  })

const RegistrationForm = () => {
  const [loading, setLoading] = useState<Boolean>(false)
  const router = useRouter()
  const { handleLoginWithGoogle } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      // Check if passwords match
      if (values.password !== values.passwordConfirm) {
        toast.error("Passwords do not match")
        setLoading(false)
        return
      }

      const registrationPromise = new Promise((resolve, reject) => {
        axios
          .post("/api/auth/sign-up", values)
          .then((response) => {
            // Check for success status
            if (response.status === 200) {
              resolve(response.data) // Resolve with the response data
            } else {
              reject(response.data.message || "Registration failed") // Reject with the error message
            }
          })
          .catch((error) => {
            reject(error.response.data.message || "Registration failed") // Reject with the error message from the response
          })
      })

      toast.promise(registrationPromise, {
        loading: "Registering in...",
        success: () => {
          router.push("/login")
          router.refresh()
          setLoading(false)
          return "Registration successful"
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
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="container relative flex pt-10 flex-col items-center justify-center lg:px-0 mb-16">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
          <h1 className="text-2xl font-semibold tracking-tight text-center">
            Register your account
          </h1>
          <p className="text-muted-foreground text-center">
            Enter your email below to create your account
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem className="mt-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          id="email"
                          placeholder="Email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem className="mt-4">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          id="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => {
                  return (
                    <FormItem className="mt-4">
                      <FormLabel htmlFor="passwordConfirm">
                        Password confirm
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          id="passwordConfirm"
                          placeholder="Confirm password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <Button
                type="submit"
                className="w-full mt-6"
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span>Register</span>
                )}
              </Button>
            </form>
          </Form>

          <Link
            className={buttonVariants({
              variant: "link",
              className: "self-center",
            })}
            href="/login"
          >
            Already have account? Login
            <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="flex items-center">
            <Separator className="flex-1" />
            <span className="flex-1 text-center text-xs">OR</span>
            <Separator className="flex-1" />
          </div>

          <Button
            className="bg-foreground/5 text-foreground/80"
            variant="ghost"
            onClick={() => handleLoginWithGoogle()}
            disabled={loading as boolean}
          >
            <span>Login with Google</span>
          </Button>
        </div>
      </div>
    </>
  )
}

export default RegistrationForm
