import type { Metadata } from "next"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Zyle online store",
  description: "Zyle e-commerce store. Buy your favorite products online.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
