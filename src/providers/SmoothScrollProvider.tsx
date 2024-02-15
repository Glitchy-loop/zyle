"use client"

import { useEffect } from "react"

export default function SmoothScrollProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    ;(async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default
      const locomotiveScroll = new LocomotiveScroll()
    })()
  }, [])

  return (
    <div data-scroll-container data-scroll data-scroll-speed="0.5">
      {children}
    </div>
  )
}
