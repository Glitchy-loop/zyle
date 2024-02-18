import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"

const loading = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-400"></div>
      </div>
    </MaxWidthWrapper>
  )
}

export default loading
