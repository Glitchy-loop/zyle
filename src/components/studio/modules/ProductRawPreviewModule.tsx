import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Product } from "@/types/collection"

const ProductRawPreviewModule = ({ product }: { product: Product }) => {
  return (
    <Card className="mt-8">
      {/* Head */}
      <CardHeader>
        <CardTitle className="mb-4">Product raw data</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      {/* Body */}
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Raw product data</AccordionTrigger>
            <AccordionContent>
              <pre className="overflow-auto bg-secondary p-4">
                {JSON.stringify(product, null, 2)}
              </pre>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      {/* Footer */}
      <CardFooter></CardFooter>
    </Card>
  )
}

export default ProductRawPreviewModule
