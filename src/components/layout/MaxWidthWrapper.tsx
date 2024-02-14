import { cn } from "@/lib/utils"
import { ReactNode } from "react"

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    <section
      className={cn("mx-auto w-full max-w-screen-xl px-4 md:px-20", className)}
    >
      {children}
    </section>
  )
}

export default MaxWidthWrapper
