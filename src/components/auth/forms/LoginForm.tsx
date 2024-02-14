"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
import { Separator } from "../../ui/separator"
import { ArrowRightIcon, Loader2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import useAuth from "../../../hooks/useAuth"

const formSchema = z.object({
  email: z.string().email().min(4),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

const LoginForm = () => {
  const [loading, setLoading] = useState<Boolean>(false)
  const router = useRouter()
  const { login, handleLoginWithGoogle } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    toast.success("Login successful")
    try {
      setLoading(true)
      const result = await login(values)
      const loginPromise = new Promise((resolve, reject) => {
        // Check for success status in result
        if (result.success) {
          resolve(result.data) // Resolve with the response data
        } else {
          reject(result.error) // Reject with the error message
        }
      })
      toast.promise(loginPromise, {
        loading: "Logging in...",
        success: () => {
          router.push("/dashboard")
          router.refresh()
          setLoading(false)
          return "Login successful"
        },
        error: (error) => {
          console.error(error)
          setLoading(false)
          return `${error}`
        },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container relative flex pt-10 flex-col items-center justify-center lg:px-0 mb-16">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
        <h1 className="text-2xl font-semibold tracking-tight text-center">
          Login in to your account
        </h1>
        <p className="text-muted-foreground text-center">
          Enter your email below to login in to your account
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
            {/* Forgot password link */}
            <Link
              className={buttonVariants({
                variant: "link",
                className:
                  "self-end text-xs float-right px-0 pb-0 text-muted-foreground",
              })}
              href="/forgot-password"
            >
              Forgot password?
            </Link>
            <Button
              type="submit"
              className="w-full mt-6"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span>Login</span>
              )}
            </Button>
          </form>
        </Form>

        <Link
          className={buttonVariants({
            variant: "link",
            className: "self-center",
          })}
          href="/register"
        >
          Dont&apos;t have an account? Register
          <ArrowRightIcon className="h-4 w-4" />
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
  )
}

export default LoginForm
