import type { Metadata } from "next"
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"

export const metadata: Metadata = {
  title: "Zyle online store",
  description: "Zyle e-commerce store. Buy your favorite products online.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <MaxWidthWrapper>{children}</MaxWidthWrapper>
}
