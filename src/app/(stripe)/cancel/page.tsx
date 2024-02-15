import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"
import { CheckCircle, XCircle } from "lucide-react"

const CancelPage = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col justify-center items-center mt-16">
        <h1 className="text-2xl">Your order was cancelled</h1>
        <p className="py-2">
          Your order was not completed. And you have not been charged for this
          transaction.
        </p>
      </div>
    </MaxWidthWrapper>
  )
}

export default CancelPage
