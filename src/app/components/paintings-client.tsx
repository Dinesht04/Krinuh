"use client"

import { useEffect, useState } from "react"
import { ProductCard, type Product } from "@/components/product-card"
import { Skeleton } from "@/components/ui/skeleton"

interface PaintingAPIResponse {
  success: boolean
  data: Array<{
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
  }>
}

function mapPaintings(apiData: PaintingAPIResponse): Product[] {
  return apiData.data.map((painting) => ({
    id: painting._id,
    title: painting.title,
    price: painting.price.endsWith("/-") ? painting.price : `${painting.price}/-`,
    description: painting.description,
    size: painting.size,
    Medium: painting.medium,
    Surface: painting.surface,
    ToBeDeliveredAs: painting.toBeDeliveredAs,
    cloudinaryPublicId: painting.cldImagePublicIds?.[0],
    category: "Paintings",
    sold: painting.sold,
  }))
}

const MAX_ATTEMPTS = 6 // ~ generous enough to cover a ~45s cold start with backoff below

export function PaintingsClient() {
  const [paintings, setPaintings] = useState<Product[] | null>(null)
  const [attempt, setAttempt] = useState(0)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load(attemptNumber: number) {
      try {
        // Per-attempt timeout so a hung request doesn't block retries forever.
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000)

        const response = await fetch("https://krinuh-be-ts.vercel.app/painting/all", {
          cache: "no-store",
          signal: controller.signal,
        })
        clearTimeout(timeoutId)

        if (!response.ok) throw new Error(`Request failed: ${response.status}`)

        const apiData: PaintingAPIResponse = await response.json()
        if (!apiData.success || !apiData.data) throw new Error("Malformed response")
        if (!cancelled) {
          setPaintings(mapPaintings(apiData))
        }
      } catch (err) {
        if (cancelled) return

        if (attemptNumber < MAX_ATTEMPTS) {
          // Backoff: 2s, 4s, 6s, 8s, 10s... gives the Render dyno time to wake up.
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

  if (failed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-center">
        <p className="text-[#414141BF]">
          We&apos;re having trouble loading the gallery right now. Please refresh the page in a moment.
        </p>
      </div>
    )
  }

  if (paintings === null) {
    return (
      <div>
        <p className="text-[#414141BF] mb-6">
          {attempt <= 1
            ? "Loading paintings..."
            : "Still waking up the gallery — this can take up to a minute on the first visit..."}
        </p>
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="break-inside-avoid">
              <Skeleton className="aspect-square rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (paintings.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-[#414141BF]">No paintings available at the moment.</p>
      </div>
    )
  }

  return (
    <>
      <p className="text-[#414141BF] mb-6">Showing {paintings.length} paintings</p>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {paintings.map((painting, index) => (
          <div key={painting.id} className="break-inside-avoid">
            <ProductCard product={painting} aspectRatio={index % 3 === 0 ? "portrait" : "square"} />
          </div>
        ))}
      </div>
    </>
  )
}