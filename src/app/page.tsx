import Features from "@/components/Features"
import Hero from "@/components/Hero"
import Testimonials from "@/components/Testimonials"
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <Hero />
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <Features />
      </MaxWidthWrapper>
      <div className="bg-secondary">
        <MaxWidthWrapper>
          <Testimonials />
        </MaxWidthWrapper>
      </div>
    </>
  )
}
