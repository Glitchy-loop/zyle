import { Headset, Shield, Truck } from "lucide-react"

export const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Studio",
    href: "/studio",
  },
]

export const loginRegisterNavItems = [
  {
    name: "Login",
    href: "/login",
  },
  {
    name: "Register",
    href: "/register",
  },
]

export const currency = {
  type: "eur",
  symbol: "€",
}

export const features = [
  {
    title: "Secure payment",
    description: "Secure on order",
    icon: <Shield className="w-9 h-9" />,
  },
  {
    title: "Fast delivery",
    description: "Fast delivery to your door.",
    icon: <Truck className="w-9 h-9" />,
  },
  {
    title: "24/7 support",
    description: "Connect to us 24h a day.",
    icon: <Headset className="w-9 h-9" />,
  },
]

export const testimonials = [
  {
    name: "Emily Smith",
    text: "The product quality exceeded my expectations. Ordering was a breeze, and the customer service team was incredibly helpful.",
    stars: 5,
  },
  {
    name: "Chris Johnson",
    text: "Exceptional experience from start to finish. The user interface is intuitive, and the product variety is impressive. Highly satisfied!",
    stars: 4,
  },
  {
    name: "John Doe",
    text: "I love this website. It's so easy to use and the support is amazing.",
    stars: 5,
  },
  {
    name: "Megan Brown",
    text: "Reliable and efficient! I've never had such a smooth online shopping experience. The quick response from the support team made it even better.",
    stars: 4,
  },
  {
    name: "Bob Doe",
    text: "Great service 24/7. Definetly will recommend to everyone.",
    stars: 5,
  },

  {
    name: "Alex Turner",
    text: "Outstanding customer care! The team went above and beyond to assist me. The speedy resolution of my query left me thoroughly impressed.",
    stars: 5,
  },
  {
    name: "Jane Doe",
    text: "I love the fast delivery and the secure payment. 5 stars!",
    stars: 5,
  },
]

export const studioNavItems = [
  {
    name: "Products",
    href: "/studio/products",
  },
  {
    name: "Orders",
    href: "/studio/orders",
  },
  {
    name: "Settings",
    href: "/studio/settings",
  },
]

export const genders = ["Men", "Women", "Unisex"]
