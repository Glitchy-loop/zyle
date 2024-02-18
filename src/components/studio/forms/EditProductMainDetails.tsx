"use client"

import React, { useState } from "react"
import { Collection, Product } from "@/types/collection"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface EditProductFormProps {
  product: Product
  collections: Collection[]
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is too short" }).max(50),
  description: z.string().min(10).max(500),

  collection: z.string().optional(),
})

const EditProductMainDetailsForm = ({
  product,
  collections,
}: EditProductFormProps) => {
  const [loading, setLoading] = useState<Boolean>(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name || "",
      description: product.description || "",
      collection: product.collection! || "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData()

    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("collection", data.collection || "")
    formData.append("id", product.id)
    formData.append("stripe_product_id", product.stripe_product_id || "")

    const editProductPromise = new Promise((resolve, reject) => {
      axios
        .post(`/api/studio/products/edit-product-main-details`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          // Check for success status
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(response.data.message || "Couldn't update the product.")
          }
        })
        .catch((error) => {
          reject(error.response.data.message || "Couldn't update the product.")
        })
    })
    toast.promise(editProductPromise, {
      loading: "Editing the product...",
      success: () => {
        router.push(`/studio/products/product?id=${product.id}`)
        router.refresh()
        setLoading(false)
        return "Product updated successfully!"
      },
      error: (error) => {
        console.error(error)
        setLoading(false)
        return `${error.message}`
      },
    })
    setLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-8">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Product name" {...field} />
              </FormControl>
              <FormDescription>Enter product name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Product description" {...field} />
              </FormControl>
              <FormDescription>Enter product description</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Collection */}
        <FormField
          control={form.control}
          name="collection"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a collection" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {collections.map((collection, index) => (
                    <SelectItem
                      key={index}
                      value={collection.name}
                      defaultValue={product?.collection || ""}
                    >
                      {collection.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select a collection for the product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={(loading as boolean) || form.formState.isSubmitting}
        >
          Update product
        </Button>
      </form>
    </Form>
  )
}

export default EditProductMainDetailsForm
