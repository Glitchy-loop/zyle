import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const SuccessPage = ({ searchParams }: paramsProps) => {
  const payment_intent: string = searchParams.payment_intent?.toString() || ""
  console.log(payment_intent)
  console.log(searchParams)
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col justify-center items-center mt-16">
        <h1 className="text-2xl">Thank you for your purchase!</h1>
        <p className="py-2">Your order successfully completed.</p>
        <CheckCircle size={40} className="text-green-500 mt-4" />
        <p>{payment_intent}</p>
        <Link
          href={`${process.env.NEXT_PUBLIC_WEB_URL}/shop`}
          className="mt-10"
        >
          <Button variant="default">Continue Shopping</Button>
        </Link>
      </div>
    </MaxWidthWrapper>
  )
}

export default SuccessPage
