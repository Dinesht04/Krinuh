"use client"

import { useEffect, useMemo, useState } from "react"
import { ProductCard, type Product } from "@/components/product-card"
import { ProductFilters, type FilterGroup } from "@/components/product-filters"
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

const numericPrice = (p: string) => Number.parseInt(p.replace(/[^0-9]/g, "")) || 0

const PRICE_BUCKETS = [
  { value: "all", label: "All prices", test: () => true },
  { value: "u1000", label: "Under ₹1,000", test: (n: number) => n < 1000 },
  { value: "1000-3000", label: "₹1,000–3,000", test: (n: number) => n >= 1000 && n < 3000 },
  { value: "3000-5000", label: "₹3,000–5,000", test: (n: number) => n >= 3000 && n < 5000 },
  { value: "o5000", label: "₹5,000 & up", test: (n: number) => n >= 5000 },
]

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
]

const MAX_ATTEMPTS = 6

export function PaintingsClient() {
  const [paintings, setPaintings] = useState<Product[] | null>(null)
  const [attempt, setAttempt] = useState(0)
  const [failed, setFailed] = useState(false)

  const [medium, setMedium] = useState("all")
  const [surface, setSurface] = useState("all")
  const [price, setPrice] = useState("all")
  const [availability, setAvailability] = useState("all")
  const [sort, setSort] = useState("featured")

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
        if (!cancelled) setPaintings(mapPaintings(apiData))
      } catch {
        if (cancelled) return
        if (attemptNumber < MAX_ATTEMPTS) {
          setAttempt(attemptNumber)
          setTimeout(() => !cancelled && load(attemptNumber + 1), 2000 * attemptNumber)
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

  // Distinct mediums / surfaces from the live data
  const mediums = useMemo(
    () => Array.from(new Set((paintings ?? []).map((p) => p.Medium).filter(Boolean))) as string[],
    [paintings],
  )
  const surfaces = useMemo(
    () => Array.from(new Set((paintings ?? []).map((p) => p.Surface).filter(Boolean))) as string[],
    [paintings],
  )

  const filtered = useMemo(() => {
    let list = (paintings ?? []).filter((p) => {
      if (medium !== "all" && p.Medium !== medium) return false
      if (surface !== "all" && p.Surface !== surface) return false
      if (availability === "available" && p.sold) return false
      if (availability === "sold" && !p.sold) return false
      const bucket = PRICE_BUCKETS.find((b) => b.value === price)
      if (bucket && !bucket.test(numericPrice(p.price))) return false
      return true
    })

    if (sort === "price-asc") list = [...list].sort((a, b) => numericPrice(a.price) - numericPrice(b.price))
    if (sort === "price-desc") list = [...list].sort((a, b) => numericPrice(b.price) - numericPrice(a.price))
    return list
  }, [paintings, medium, surface, availability, price, sort])

  const groups: FilterGroup[] = [
    {
      key: "availability",
      label: "Availability",
      value: availability,
      onChange: setAvailability,
      options: [
        { value: "all", label: "All" },
        { value: "available", label: "Available" },
        { value: "sold", label: "Sold" },
      ],
    },
    {
      key: "price",
      label: "Price",
      value: price,
      onChange: setPrice,
      options: PRICE_BUCKETS.map(({ value, label }) => ({ value, label })),
    },
    {
      key: "medium",
      label: "Medium",
      value: medium,
      onChange: setMedium,
      options: [{ value: "all", label: "All" }, ...mediums.map((m) => ({ value: m, label: m }))],
    },
    {
      key: "surface",
      label: "Surface",
      value: surface,
      onChange: setSurface,
      options: [{ value: "all", label: "All" }, ...surfaces.map((s) => ({ value: s, label: s }))],
    },
  ]

  const activeCount = [medium, surface, price, availability].filter((v) => v !== "all").length

  const clearAll = () => {
    setMedium("all")
    setSurface("all")
    setPrice("all")
    setAvailability("all")
  }

  if (failed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-center">
        <p className="text-krinuh-text/75">
          We&apos;re having trouble loading the gallery right now. Please refresh the page in a moment.
        </p>
      </div>
    )
  }

  if (paintings === null) {
    return (
      <div>
        <p className="text-krinuh-text/75 mb-6">
          {attempt <= 1
            ? "Loading paintings..."
            : "Still waking up the gallery — this can take up to a minute on the first visit..."}
        </p>
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="break-inside-avoid">
              <Skeleton className="aspect-square rounded-none" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <ProductFilters
        groups={groups}
        sort={{ value: sort, onChange: setSort, options: SORT_OPTIONS }}
        resultCount={filtered.length}
        activeCount={activeCount}
        onClear={clearAll}
      />

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="font-serif text-xl text-krinuh-ink mb-2">No paintings match those filters</h3>
          <button onClick={clearAll} className="text-sm text-krinuh-primary hover:underline">
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((painting, index) => (
            <div key={painting.id} className="break-inside-avoid">
              <ProductCard product={painting} aspectRatio={index % 3 === 0 ? "portrait" : "square"} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}
