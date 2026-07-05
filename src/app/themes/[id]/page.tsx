"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { ProductCard, type Product } from "@/components/product-card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"
import { toast } from "sonner"

interface ThemeProductAPI {
  productType: "Painting" | "Jewellery"
  productId:
    | { _id: string; title: string; price: string; cldImagePublicIds: string[]; sold: boolean }
    | string
}

interface ThemeAPIItem {
  _id: string
  title: string
  description: string
  products: ThemeProductAPI[]
}

interface ThemeAPIResponse {
  success: boolean
  data: ThemeAPIItem[]
}

function mapThemeProduct(p: ThemeProductAPI): Product | null {
  if (typeof p.productId === "string") return null
  const item = p.productId
  return {
    id: item._id,
    title: item.title,
    name: item.title,
    price: item.price.endsWith("/-") ? item.price : `${item.price}/-`,
    cloudinaryPublicIds: item.cldImagePublicIds || [],
    category: p.productType === "Jewellery" ? "Jewelry" : "Paintings",
    sold: item.sold,
  }
}

export default function ThemeDetailPage() {
  const params = useParams<{ id: string }>()
  const [themes, setThemes] = useState<ThemeAPIItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/theme/all", { cache: "no-store" })
        if (!response.ok) throw new Error(`Failed to fetch themes: ${response.status}`)
        const apiData: ThemeAPIResponse = await response.json()
        if (!apiData.success || !apiData.data) throw new Error("Invalid API response")
        setThemes(apiData.data)
        setError(null)
      } catch (err) {
        toast.error("Failed to fetch theme, please try again later")
        setError(err instanceof Error ? err.message : "Failed to fetch theme")
      } finally {
        setIsLoading(false)
      }
    }

    fetchThemes()
  }, [])

  const breadcrumbRoot = (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Home className="h-4 w-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/themes">Themes</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          {breadcrumbRoot}
          <Skeleton className="h-8 w-1/3 mb-2" />
          <Skeleton className="h-4 w-2/3 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-none" />
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          {breadcrumbRoot}
          <p className="text-krinuh-text/75">
            We&apos;re having trouble loading this theme right now. Please refresh the page in a moment.
          </p>
        </div>
      </main>
    )
  }

  const theme = themes.find((t) => t._id === params.id)

  if (!theme) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          {breadcrumbRoot}
          <p className="text-krinuh-text/75 mb-4">We couldn&apos;t find that theme.</p>
          <Link href="/themes" className="text-krinuh-primary underline">
            Back to Themes
          </Link>
        </div>
      </main>
    )
  }

  const products = theme.products.map(mapThemeProduct).filter((p): p is Product => p !== null)

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/themes">Themes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-krinuh-primary">{theme.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="font-serif text-3xl font-medium text-krinuh-ink mb-2">{theme.title}</h1>
        <p className="text-krinuh-text/75 mb-8">{theme.description}</p>

        {products.length === 0 ? (
          <p className="text-krinuh-text/75">No products in this theme yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={`${product.category}-${product.id}`} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
