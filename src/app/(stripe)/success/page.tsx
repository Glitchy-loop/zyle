import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

const SuccessPage = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col justify-center items-center mt-16">
        <h1 className="text-2xl">Thank you for your purchase!</h1>
        <p className="py-2">Your order successfully completed.</p>
        <CheckCircle size={40} className="text-green-500" />

        <Link href="/" className="mt-10">
          <Button variant="default">Continue Shopping</Button>
        </Link>
      </div>
    </MaxWidthWrapper>
  )
}

export default SuccessPage
