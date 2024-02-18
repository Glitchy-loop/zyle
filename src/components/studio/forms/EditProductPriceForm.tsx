"use client"

import React, { useState } from "react"
import { Collection, Color, Product, Size } from "@/types/collection"
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

import { Button } from "@/components/ui/button"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface EditProductFormProps {
  product: Product
}

const formSchema = z.object({
  price: z.any(),
})

const EditProductPriceForm = ({ product }: EditProductFormProps) => {
  const [loading, setLoading] = useState<Boolean>(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: product.price || 0,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData()

    formData.append("price", data.price.toString())
    formData.append("id", product.id)
    formData.append("stripe_product_id", product.stripe_product_id || "")

    const editProductPromise = new Promise((resolve, reject) => {
      axios
        .post(`/api/studio/products/edit-product-price`, formData, {
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
        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Price" {...field} />
              </FormControl>
              <FormDescription>Enter product price</FormDescription>
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

export default EditProductPriceForm
