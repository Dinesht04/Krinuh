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
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"
import { pickRandom } from "@/lib/utils"

interface PaintingAPIItem {
  _id: string
  title: string
  price: string
  description?: string
  size?: string
  medium?: string
  surface?: string
  toBeDeliveredAs?: string
  cldImagePublicIds: string[]
  sold: boolean
}

interface PaintingAPIResponse {
  success: boolean
  data: PaintingAPIItem[]
}

function mapPainting(item: PaintingAPIItem): Product {
  return {
    id: item._id,
    title: item.title,
    price: item.price.endsWith("/-") ? item.price : `${item.price}/-`,
    description: item.description,
    size: item.size,
    Medium: item.medium,
    Surface: item.surface,
    ToBeDeliveredAs: item.toBeDeliveredAs,
    cloudinaryPublicIds: item.cldImagePublicIds || [],
    category: "Paintings",
    sold: item.sold,
  }
}

const MAX_ATTEMPTS = 6

export default function PaintingDetailPage() {
  const params = useParams<{ id: string }>()
  const [paintings, setPaintings] = useState<Product[] | null>(null)
  const [attempt, setAttempt] = useState(0)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load(attemptNumber: number) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000)

        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/painting/all", {
          cache: "no-store",
          signal: controller.signal,
        })
        clearTimeout(timeoutId)

        if (!response.ok) throw new Error(`Request failed: ${response.status}`)

        const apiData: PaintingAPIResponse = await response.json()
        if (!apiData.success || !apiData.data) throw new Error("Malformed response")
        if (!cancelled) setPaintings(apiData.data.map(mapPainting))
      } catch (err) {
        if (cancelled) return
        if (attemptNumber < MAX_ATTEMPTS) {
          const delay = 2000 * attemptNumber
          setAttempt(attemptNumber)
          setTimeout(() => {
            if (!cancelled) load(attemptNumber + 1)
          }, delay)
        } else {
          setFailed(true)
        }
      }
    }

    load(1)
    return () => {
      cancelled = true
    }
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
          <BreadcrumbLink href="/gallery">Gallery</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )

  if (failed) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          {breadcrumb}
          <p className="text-krinuh-text/75">
            We&apos;re having trouble loading this painting right now. Please refresh the page in a moment.
          </p>
        </div>
      </main>
    )
  }

  if (paintings === null) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          {breadcrumb}
          <p className="text-krinuh-text/75 mb-6">
            {attempt <= 1 ? "Loading painting..." : "Still waking up the gallery — this can take up to a minute..."}
          </p>
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

  const product = paintings.find((p) => String(p.id) === params.id)

  if (!product) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          {breadcrumb}
          <p className="text-krinuh-text/75 mb-4">We couldn&apos;t find that painting.</p>
          <Link href="/gallery" className="text-krinuh-primary underline">
            Back to Gallery
          </Link>
        </div>
      </main>
    )
  }

  const recommended = pickRandom(paintings.filter((p) => p.id !== product.id))

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
              <BreadcrumbLink href="/gallery">Gallery</BreadcrumbLink>
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
