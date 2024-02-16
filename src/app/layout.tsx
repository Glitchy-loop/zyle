import type { Metadata } from "next"
import { Audiowide as FontSans } from "next/font/google"
import "../styles/globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/providers/ThemeProvider"
import Header from "@/components/layout/Header"
import { Toaster } from "sonner"
import { ReactQueryClientProvider } from "@/providers/QueryClientProvider"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import SmoothScrollProvider from "@/providers/SmoothScrollProvider"
import CartProvider from "@/providers/CartProvider"
import ShoppingCartSidebar from "@/components/layout/ShoppingCartSidebar"
import Footer from "@/components/layout/Footer"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400"],
})

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

  // Merge additional user data from the database into session.user
  const mergedSession = session?.user
    ? { ...session, user: { ...session.user, ...userData } }
    : null

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        {/* <ReactQueryClientProvider> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <Header session={mergedSession} />

            <ShoppingCartSidebar />
            <SmoothScrollProvider>
              <main>{children}</main>
              <Footer />
            </SmoothScrollProvider>
          </CartProvider>
        </ThemeProvider>
        {/* </ReactQueryClientProvider> */}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
