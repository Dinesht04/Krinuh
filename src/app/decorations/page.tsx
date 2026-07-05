"use client"
import { useState, useMemo } from "react"
import Navbar from "@/components/Navbar"
import { ProductCard } from "@/components/product-card"
import { ProductFilters, type FilterGroup } from "@/components/product-filters"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"
import { decorationsData } from "@/v2/sampleData"

const numericPrice = (p: string) => Number.parseInt(p.replace(/[^0-9]/g, "")) || 0

const PRICE_BUCKETS = [
  { value: "all", label: "All prices", test: () => true },
  { value: "u3000", label: "Under ₹3,000", test: (n: number) => n < 3000 },
  { value: "3000-5000", label: "₹3,000–5,000", test: (n: number) => n >= 3000 && n < 5000 },
  { value: "5000-8000", label: "₹5,000–8,000", test: (n: number) => n >= 5000 && n < 8000 },
  { value: "o8000", label: "₹8,000 & up", test: (n: number) => n >= 8000 },
]

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "newest", label: "Newest" },
]

export default function DecorationsPage() {
  const [theme, setTheme] = useState("all")
  const [material, setMaterial] = useState("all")
  const [style, setStyle] = useState("all")
  const [price, setPrice] = useState("all")
  const [sort, setSort] = useState("featured")

  const themes = useMemo(
    () => Array.from(new Set(decorationsData.map((i) => i.theme).filter(Boolean))) as string[],
    [],
  )
  const materials = useMemo(
    () => Array.from(new Set(decorationsData.map((i) => i.material_type).filter(Boolean))) as string[],
    [],
  )
  const styles = useMemo(
    () => Array.from(new Set(decorationsData.map((i) => i.style).filter(Boolean))) as string[],
    [],
  )

  const filtered = useMemo(() => {
    const list = decorationsData.filter((item) => {
      if (theme !== "all" && item.theme !== theme) return false
      if (material !== "all" && item.material_type !== material) return false
      if (style !== "all" && item.style !== style) return false
      const bucket = PRICE_BUCKETS.find((b) => b.value === price)
      if (bucket && !bucket.test(numericPrice(item.price))) return false
      return true
    })

    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => numericPrice(a.price) - numericPrice(b.price))
      case "price-desc":
        return [...list].sort((a, b) => numericPrice(b.price) - numericPrice(a.price))
      case "newest":
        return [...list].sort((a, b) => {
          const idA = typeof a.id === "string" ? Number.parseInt(a.id.replace(/[^0-9]/g, "")) : Number(a.id)
          const idB = typeof b.id === "string" ? Number.parseInt(b.id.replace(/[^0-9]/g, "")) : Number(b.id)
          return idB - idA
        })
      default:
        return [...list].sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0))
    }
  }, [theme, material, style, price, sort])

  const groups: FilterGroup[] = [
    {
      key: "theme",
      label: "Theme",
      value: theme,
      onChange: setTheme,
      options: [{ value: "all", label: "All" }, ...themes.map((t) => ({ value: t, label: t }))],
    },
    {
      key: "material",
      label: "Material",
      value: material,
      onChange: setMaterial,
      options: [{ value: "all", label: "All" }, ...materials.map((m) => ({ value: m, label: m }))],
    },
    {
      key: "style",
      label: "Style",
      value: style,
      onChange: setStyle,
      options: [{ value: "all", label: "All" }, ...styles.map((s) => ({ value: s, label: s }))],
    },
    {
      key: "price",
      label: "Price",
      value: price,
      onChange: setPrice,
      options: PRICE_BUCKETS.map(({ value, label }) => ({ value, label })),
    },
  ]

  const activeCount = [theme, material, style, price].filter((v) => v !== "all").length
  const clearAll = () => {
    setTheme("all")
    setMaterial("all")
    setStyle("all")
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
              <BreadcrumbLink href="/decorations" className="text-krinuh-primary">
                Decorations
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="font-serif text-3xl font-medium text-krinuh-ink mb-2">Home Decorations</h1>
        <p className="text-krinuh-text/75 mb-8">Transform your space with our unique decorative pieces</p>

        <ProductFilters
          groups={groups}
          sort={{ value: sort, onChange: setSort, options: SORT_OPTIONS }}
          resultCount={filtered.length}
          activeCount={activeCount}
          onClear={clearAll}
        />

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="font-serif text-xl text-krinuh-ink mb-2">No products match those filters</h3>
            <button onClick={clearAll} className="text-sm text-krinuh-primary hover:underline">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length > 0 && (
              <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
                <ProductCard product={filtered[0]} aspectRatio="portrait" />
              </div>
            )}
            {filtered.slice(1).map((decoration) => (
              <div key={decoration.id}>
                <ProductCard product={decoration} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
