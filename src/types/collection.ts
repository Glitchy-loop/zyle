import { Database } from "./supabase"

export type User = Database["public"]["Tables"]["users"]["Row"]
export type Product = Database["public"]["Tables"]["products"]["Row"]
export type Collection = Database["public"]["Tables"]["collections"]["Row"]
export type Color = Database["public"]["Tables"]["colors"]["Row"]
export type Size = Database["public"]["Tables"]["sizes"]["Row"]
export type Category = Database["public"]["Tables"]["categories"]["Row"]
