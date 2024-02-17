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
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { genders } from "@/lib/constants"
import { supabase } from "@/lib/supabase/supabase-client"
import { Collection, Color, Size } from "@/types/collection"
import { Checkbox } from "@/components/ui/checkbox"

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
  collection: z.string().optional(),
  stock: z.string().transform((v) => Number(v) || 0),
  color: z.string().min(2).max(50),
  sizes: z.any(),
})

const CreateProductForm = () => {
  const [loading, setLoading] = useState<Boolean>(false)
  const [collections, setCollections] = useState<Collection[]>([])
  const [colors, setColors] = useState<Color[]>([])
  const [sizes, setSizes] = useState<Size[]>([])
  const router = useRouter()

  const getCollections = async () => {
    const { data: collections, error } = await supabase
      .from("collections")
      .select("*")

    return setCollections(collections || [])
  }

  const getColors = async () => {
    const { data: colors, error } = await supabase.from("colors").select("*")
    return setColors(colors || [])
  }

  const getSizes = async () => {
    const { data: sizes, error } = await supabase.from("sizes").select("*")
    return setSizes(sizes || [])
  }

  // Get collections from database
  useEffect(() => {
    getCollections()
    getColors()
    getSizes()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      images: [], // Initialize with an empty array for multiple images
      gender: "",
      collection: "",
      stock: 0,
      color: "",
      sizes: [],
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

    data.images.forEach((image: Blob) => {
      formData.append("images", image)
    })

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
        router.push("/studio/products")
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
        {/* Images */}
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="my-6">
              <FormLabel>Images</FormLabel>
              <FormControl>
                <Input
                  name="images"
                  accept=".jpg, .jpeg, .png"
                  type="file"
                  required
                  multiple // Enable multiple file selection
                  onChange={(e) =>
                    field.onChange(
                      e.target.files ? Array.from(e.target.files) : []
                    )
                  }
                />
              </FormControl>
              <FormDescription>
                Images must be in png, jpeg, or jpg format and each file should
                be less than 1MB.
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {genders.map((gender, index) => (
                    <SelectItem key={index} value={gender.name}>
                      {gender.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select a gender for the product</FormDescription>
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
                    <SelectItem key={index} value={collection.name}>
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
                defaultValue={field.value ? field.value[0] : undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {colors.map((color, index) => (
                    <SelectItem key={index} value={color.name}>
                      {color.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select a color for the product</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Sizes */}
        <FormField
          control={form.control}
          name="sizes"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sizes</FormLabel>
                <FormDescription>
                  Select the sizes you want to associate with the product.
                </FormDescription>
              </div>
              {sizes.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="sizes"
                  render={({ field }) => {
                    return (
                      <FormItem
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
                                        value !== String(item.size)
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.size}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={(loading as boolean) || form.formState.isSubmitting}
        >
          Create product
        </Button>
      </form>
    </Form>
  )
}

export default CreateProductForm
