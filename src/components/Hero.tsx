import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

const Hero = () => {
  return (
    <div className="flex h-[80vh] flex-col mt-10 md:flex-row md:h-[45vh]">
      <div className="flex flex-col justify-center order-2 md:order-1 mt-4 md:mt-0">
        <h1 className="text-3xl font-bold">Find your dream sneakers</h1>
        <p className="py-6">
          The best place to find the perfect sneakers for you. We have a wide
          range of sneakers from different brands.
        </p>
        <Link href={`${process.env.NEXT_PUBLIC_WEB_URL}/shop`}>
          <Button className="h-12 self-start w-40">Shop now</Button>
        </Link>
      </div>
      <div className="relative h-full w-full order-1 md:order-2">
        <Image
          src="/hero2.png"
          alt="Hero"
          fill
          className="object-cover object-center pointer-events-none"
        />
      </div>
    </div>
  )
}

export default Hero
