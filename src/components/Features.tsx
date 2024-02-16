import { features } from "@/lib/constants"

const Features = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between my-20 md:my-40">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row md:justify-between my-6 md:my-4"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="bg-primary rounded-xl p-4">
              <span className="text-primary-foreground">{feature.icon}</span>
            </div>
            <div className="flex flex-col ms-4 text-center md:text-start">
              <h3 className="text-xl font-semibold my-2 md:my-0">
                {feature.title}
              </h3>
              <p className="text-xs">{feature.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Features
