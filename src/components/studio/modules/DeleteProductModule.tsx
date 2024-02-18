"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Product } from "@/types/collection"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

const DeleteProductModule = ({ product }: { product: Product }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  // Handle delete product
  const handleDeleteProduct = async () => {
    setIsDeleting(true)

    const promise = () =>
      new Promise((resolve) => {
        axios
          .delete(
            `${process.env.NEXT_PUBLIC_WEB_URL}/api/studio/products/delete/product?id=${product.id}`
          )
          .then(
            (res) => {
              resolve(res.data)
            },
            (error) => {
              resolve(error)
            }
          )
      })

    toast.promise(promise, {
      loading: "Deleting...",
      success: (data) => {
        setIsDeleting(false)
        router.push("/studio/products")
        router.refresh()
        return `Product ${product.name} has been deleted successfully.`
      },
      error: "Error",
    })
  }

  return (
    <Card className="col-span-4 mt-8">
      {/* Head */}
      <CardHeader>
        <CardTitle className="mb-4">Delete product</CardTitle>
        <CardDescription>This action cannot be undone.</CardDescription>
      </CardHeader>
      {/* Body */}
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isDeleting}>
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete {product.name}?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                product from your store and database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteProduct()}
                disabled={isDeleting}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}

export default DeleteProductModule
