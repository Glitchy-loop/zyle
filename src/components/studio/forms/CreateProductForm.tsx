"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
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
import axios from "axios"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name is too short",
    })
    .max(50),
  description: z.string().min(10).max(500),
  price: z.string().transform((v) => Number(v) || 0),
  images: z.any(),
  gender: z.string().min(2).max(50),
  collection: z.string().min(2).max(50),
  stock: z.string().transform((v) => Number(v) || 0),
  color: z.array(z.string().min(2).max(50)),
  sizes: z.array(z.number().min(2).max(50)),
})

const CreateProductForm = () => {
  const [loading, setLoading] = useState<Boolean>(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Testas",
      description: "This is a test product description",
      price: 69,
      images: null,
      gender: "Men",
      collection: "Winter 2024",
      stock: 3,
      color: ["red", "blue", "green"],
      sizes: [40, 41, 42, 43],
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", data.price.toString())
    formData.append("images", data.images)
    formData.append("gender", data.gender)
    formData.append("collection", data.collection)
    formData.append("stock", data.stock.toString())
    formData.append("color", data.color.toString())
    formData.append("sizes", data.sizes.toString())

    // Axios request to register user
    setLoading(true)
    const createProductPromise = new Promise((resolve, reject) => {
      axios
        .post(`/api/studio/products/create-new-product`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          // Check for success status
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(response.data.message || "Couldn't add the product.")
          }
        })
        .catch((error) => {
          reject(error.response.data.message || "Couldn't add the product.")
        })
    })

    toast.promise(createProductPromise, {
      loading: "Adding new product...",
      success: () => {
        router.push("/shop")
        router.refresh()
        setLoading(false)
        return "Product added successfully!"
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-16">
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
        {/* Image */}
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="my-6">
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  name="image"
                  accept=".jpg, .jpeg, .png"
                  type="file"
                  required
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              </FormControl>
              <FormDescription>
                Image must be a png, jpeg or jpg and less than 5MB.
              </FormDescription>
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
              <FormControl>
                <Input placeholder="Gender" {...field} />
              </FormControl>
              <FormDescription>Add gender</FormDescription>
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
              <FormControl>
                <Input placeholder="Collection" {...field} />
              </FormControl>
              <FormDescription>Enter product collection</FormDescription>
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
              <FormControl>
                <Input placeholder="Color" {...field} />
              </FormControl>
              <FormDescription>Enter product color</FormDescription>
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
              <FormLabel>Sizes</FormLabel>
              <FormControl>
                <Input
                  placeholder="Sizes"
                  {...field}
                  value={field.value.toString()}
                />
              </FormControl>
              <FormDescription>Enter product sizes</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading as boolean}>
          Create product
        </Button>
      </form>
    </Form>
  )
}

export default CreateProductForm
