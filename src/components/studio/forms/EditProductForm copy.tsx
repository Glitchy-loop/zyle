"use client"

import React, { useEffect, useState } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { genders } from "@/lib/constants"
import { supabase } from "@/lib/supabase/supabase-client"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface EditProductFormProps {
  product: Product
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is too short" }).max(50),
  description: z.string().min(10).max(500),
  price: z.any(),
  gender: z.string().min(2).max(50),
  collection: z.string().optional(),
  stock: z.any(),
  color: z.string().min(2).max(50),
  sizes: z.any(),
})

const EditProductForm = ({ product }: EditProductFormProps) => {
  const [loading, setLoading] = useState<Boolean>(false)
  const [collections, setCollections] = useState<Collection[]>([])
  const [colors, setColors] = useState<Color[]>([])
  const [sizes, setSizes] = useState<Size[]>([])
  const router = useRouter()

  // Get collections from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collectionsData, colorsData, sizesData] = await Promise.all([
          supabase.from("collections").select("*"),
          supabase.from("colors").select("*"),
          supabase.from("sizes").select("*"),
        ])

        setCollections(collectionsData?.data || [])
        setColors(colorsData?.data || [])
        setSizes(sizesData?.data || [])
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name || "",
      description: product.description || "",
      price: product.price || 0,
      gender: product.gender || "",
      collection: product.collection || "",
      stock: product.stock || 0,
      color: product.color || "",
      sizes: product.sizes || [],
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData()

    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", data.price.toString())
    formData.append("gender", data.gender)
    formData.append("collection", data.collection || "")
    formData.append("sizes", JSON.stringify(data.sizes))
    formData.append("color", data.color)
    formData.append("stock", data.stock.toString())
    formData.append("id", product.id)
    formData.append("stripe_product_id", product.stripe_product_id || "")

    const editProductPromise = new Promise((resolve, reject) => {
      "use server"
      axios
        .post(`/api/studio/products/edit-product`, formData, {
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
    <>
      {product && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 my-16"
          >
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
            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genders.map((gender, index) => (
                        <SelectItem
                          key={index}
                          value={gender.name}
                          defaultValue={product?.gender || ""}
                        >
                          {gender.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a gender for the product
                  </FormDescription>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
            {/* Stock */}
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Stock" {...field} />
                  </FormControl>
                  <FormDescription>Enter product stock</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Color */}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={product.color}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color, index) => (
                        <SelectItem key={index} value={color && color.name}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a color for the product
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Sizes */}
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Sizes</FormLabel>
                    <FormDescription>
                      Select the sizes you want to associate with the product.
                    </FormDescription>
                  </div>
                  {sizes.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.size)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.size])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) =>
                                      value === String(item.size) // TODO fix this
                                  )
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {item.size}
                      </FormLabel>
                    </div>
                  ))}
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
      )}
    </>
  )
}

export default EditProductForm
