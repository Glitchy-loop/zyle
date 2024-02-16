import Link from "next/link"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const Footer = () => {
  return (
    <footer className="w-full py-12 md:py-24 lg:py-32 border-t">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none mb-4">
          Stay Connected
        </h2>
        <p className="mx-auto max-w-[700px] md:text-lg ">
          Subscribe to our newsletter and follow us on our social media.
        </p>
        <div className="w-full max-w-md space-y-2 my-4">
          <form className="flex space-x-2">
            <Input
              className="max-w-lg flex-1  "
              placeholder="Enter your email"
              type="email"
            />
            <Button type="submit" variant="outline">
              Subscribe
            </Button>
          </form>
        </div>

        <div className="mt-12 text-sm">
          <p>© {new Date().getFullYear()} Zyle. All rights reserved.</p>
          <p className="mt-2">
            <Link href="#">Terms of Service</Link> |{" "}
            <Link href="#">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
