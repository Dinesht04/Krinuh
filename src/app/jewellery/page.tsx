"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import { ProductCard, type Product } from "@/components/product-card"
import { ProductFilters, type FilterGroup } from "@/components/product-filters"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"
import { toast } from "sonner"

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

const numericPrice = (p: string) => Number.parseInt(p.replace(/[^0-9]/g, "")) || 0

const PRICE_BUCKETS = [
  { value: "all", label: "All prices", test: () => true },
  { value: "u5000", label: "Under ₹5,000", test: (n: number) => n < 5000 },
  { value: "5000-10000", label: "₹5,000–10,000", test: (n: number) => n >= 5000 && n < 10000 },
  { value: "10000-15000", label: "₹10,000–15,000", test: (n: number) => n >= 10000 && n < 15000 },
  { value: "o15000", label: "₹15,000 & up", test: (n: number) => n >= 15000 },
]

const CATEGORY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "earring", label: "Earrings" },
  { value: "necklace", label: "Necklaces" },
  { value: "head", label: "Head" },
  { value: "hair", label: "Hair" },
  { value: "hand", label: "Hand" },
  { value: "foot", label: "Foot" },
]

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
]

// The URL uses plural category names; map them to the singular `type` field.
const URL_CATEGORY_MAP: Record<string, string> = {
  earrings: "earring",
  necklaces: "necklace",
  head: "head",
  hair: "hair",
  hand: "hand",
  foot: "foot",
}

export default function JewelleryPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [jewelryData, setJewelryData] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [category, setCategory] = useState("all")
  const [material, setMaterial] = useState("all")
  const [price, setPrice] = useState("all")
  const [sort, setSort] = useState("featured")

  useEffect(() => {
    const fetchJewelry = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/jewellery/all", { cache: "no-store" })
        if (!response.ok) throw new Error(`Failed to fetch jewelry: ${response.status}`)
        const apiData: JewelleryAPIResponse = await response.json()
        if (!apiData.success || !apiData.data) throw new Error("Invalid API response")

        const mappedData: Product[] = apiData.data.map((item) => ({
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
          ...(item.type && { _type: item.type }),
        }))

        setJewelryData(mappedData)
        setError(null)
      } catch (err) {
        toast.error("Failed to fetch jewelry, Please try again later")
        setError(err instanceof Error ? err.message : "Failed to fetch jewelry")
        setJewelryData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchJewelry()
  }, [])

  // Honour ?category= from the homepage nav
  useEffect(() => {
    if (categoryParam) setCategory(URL_CATEGORY_MAP[categoryParam] ?? categoryParam)
  }, [categoryParam])

  const materials = useMemo(
    () => Array.from(new Set(jewelryData.map((i) => i.material).filter(Boolean))) as string[],
    [jewelryData],
  )

  const filtered = useMemo(() => {
    let list = jewelryData.filter((item) => {
      if (category !== "all" && (item as any)._type !== category) return false
      if (material !== "all" && item.material !== material) return false
      const bucket = PRICE_BUCKETS.find((b) => b.value === price)
      if (bucket && !bucket.test(numericPrice(item.price))) return false
      return true
    })
    if (sort === "price-asc") list = [...list].sort((a, b) => numericPrice(a.price) - numericPrice(b.price))
    if (sort === "price-desc") list = [...list].sort((a, b) => numericPrice(b.price) - numericPrice(a.price))
    return list
  }, [jewelryData, category, material, price, sort])

  const groups: FilterGroup[] = [
    { key: "category", label: "Category", value: category, onChange: setCategory, options: CATEGORY_OPTIONS },
    {
      key: "material",
      label: "Material",
      value: material,
      onChange: setMaterial,
      options: [{ value: "all", label: "All" }, ...materials.map((m) => ({ value: m, label: m }))],
    },
    {
      key: "price",
      label: "Price",
      value: price,
      onChange: setPrice,
      options: PRICE_BUCKETS.map(({ value, label }) => ({ value, label })),
    },
  ]

  const activeCount = [category, material, price].filter((v) => v !== "all").length
  const clearAll = () => {
    setCategory("all")
    setMaterial("all")
    setPrice("all")
  }

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
              <BreadcrumbLink href="/jewellery" className="text-krinuh-primary">
                Jewellery
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="font-serif text-3xl font-medium text-krinuh-ink mb-2">Jewellery Collection</h1>
        <p className="text-krinuh-text/75 mb-8">Discover our handcrafted jewellery pieces</p>

        {isLoading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-krinuh-text/75">Loading jewellery collection...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-red-500">Failed to load jewellery. Please try again later.</p>
          </div>
        )}

        {!isLoading && !error && (
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
                <h3 className="font-serif text-xl text-krinuh-ink mb-2">No pieces match those filters</h3>
                <button onClick={clearAll} className="text-sm text-krinuh-primary hover:underline">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.map((jewelry) => (
                  <ProductCard key={jewelry.id} product={jewelry} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
