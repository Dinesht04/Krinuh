"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { ProductDetail } from "@/components/product-detail"
import { type Product } from "@/components/product-card"
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
import { pickRandom } from "@/lib/utils"

interface JewelleryAPIItem {
  _id: string
  title: string
  price: string
  description?: string
  weight?: string
  material?: string
  gemstone?: string
  type: "earring" | "head" | "necklace" | "foot" | "hair" | "hand"
  isBestSeller?: boolean
  cldImagePublicIds: string[]
  sold: boolean
}

interface JewelleryAPIResponse {
  success: boolean
  data: JewelleryAPIItem[]
}

function mapJewellery(item: JewelleryAPIItem): Product {
  return {
    id: item._id,
    title: item.title,
    name: item.title,
    price: item.price.endsWith("/-") ? item.price : `${item.price}/-`,
    description: item.description,
    weight: item.weight,
    material: item.material,
    gemstones: item.gemstone,
    cloudinaryPublicIds: item.cldImagePublicIds || [],
    category: "Jewelry",
    isBestSeller: item.isBestSeller,
    sold: item.sold,
  }
}

export default function JewelleryDetailPage() {
  const params = useParams<{ id: string }>()
  const [jewelry, setJewelry] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJewelry = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/jewellery/all", {
          cache: "no-store",
        })

        if (!response.ok) throw new Error(`Failed to fetch jewelry: ${response.status}`)

        const apiData: JewelleryAPIResponse = await response.json()
        if (!apiData.success || !apiData.data) throw new Error("Invalid API response")

        setJewelry(apiData.data.map(mapJewellery))
        setError(null)
      } catch (err) {
        toast.error("Failed to fetch jewelry, Please try again later")
        setError(err instanceof Error ? err.message : "Failed to fetch jewelry")
      } finally {
        setIsLoading(false)
      }
    }

    fetchJewelry()
  }, [])

  const breadcrumb = (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Home className="h-4 w-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/jewellery">Jewellery</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          {breadcrumb}
          <div className="flex flex-col lg:flex-row gap-8">
            <Skeleton className="lg:w-1/2 aspect-square rounded-none" />
            <div className="lg:w-1/2 space-y-4">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-32 w-full" />
            </div>
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
          {breadcrumb}
          <p className="text-krinuh-text/75">
            We&apos;re having trouble loading this item right now. Please refresh the page in a moment.
          </p>
        </div>
      </main>
    )
  }

  const product = jewelry.find((p) => String(p.id) === params.id)

  if (!product) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          {breadcrumb}
          <p className="text-krinuh-text/75 mb-4">We couldn&apos;t find that item.</p>
          <Link href="/jewellery" className="text-krinuh-primary underline">
            Back to Jewellery
          </Link>
        </div>
      </main>
    )
  }

  const recommended = pickRandom(jewelry.filter((p) => p.id !== product.id))

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
              <BreadcrumbLink href="/jewellery">Jewellery</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-krinuh-primary">{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <ProductDetail product={product} recommended={recommended} />
      </div>
    </main>
  )
}
