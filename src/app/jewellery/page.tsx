"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import { Footer } from "@/components/footer"
import { ProductCard, type Product } from "@/components/product-card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

interface JewelleryAPIItem {
  _id: string
  title: string
  price: string
  description?: string
  weight?: string
  theme?: string
  material?: string
  gemstone?: string
  type: "earring" | "head" | "necklace" | "foot" | "hair" | "hand"
  isBestSeller?: boolean
  cldImagePublicIds: string[]
}

interface JewelleryAPIResponse {
  success: boolean
  data: JewelleryAPIItem[]
}


export default function JewelleryPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [jewelryData, setJewelryData] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTheme, setSelectedTheme] = useState<string>("all")
  const [selectedMaterial, setSelectedMaterial] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("all")

  // Fetch jewelry data on mount
  useEffect(() => {
    const fetchJewelry = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("https://krinuh-be-ts.onrender.com/jewellery/all", {
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch jewelry: ${response.status}`)
        }

        const apiData: JewelleryAPIResponse = await response.json()

        if (!apiData.success || !apiData.data) {
          throw new Error("Invalid API response")
        }

        // Map API response to Product interface
       const mappedData: Product[] = apiData.data.map((item) => ({
  id: item._id,
  title: item.title,
  price: item.price.endsWith("/-") ? item.price : `${item.price}/-`,
  description: item.description,
  weight: item.weight,
  theme: item.theme,
  material: item.material,
  gemstones: item.gemstone,
  
  // CHANGE HERE: Pass the whole array instead of just [0]
  cloudinaryPublicIds: item.cldImagePublicIds || [], 
  
  category: "Jewelry",
  isBestSeller: item.isBestSeller,
  name: item.title, 
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

  // Set active tab based on URL parameter
  useEffect(() => {
    if (categoryParam) {
      setActiveTab(categoryParam)
    }
  }, [categoryParam])

  // Get unique themes and materials for filters
  const themes = useMemo(() => {
    const allThemes = jewelryData.map((item) => item.theme).filter(Boolean)
    return ["all", ...Array.from(new Set(allThemes))]
  }, [jewelryData])

  const materials = useMemo(() => {
    const allMaterials = jewelryData.map((item) => item.material).filter(Boolean)
    return ["all", ...Array.from(new Set(allMaterials))]
  }, [jewelryData])

  // Filter jewelry based on selected filters
  const filteredJewelry = useMemo(() => {
    return jewelryData.filter((item) => {
      // Theme filter
      if (selectedTheme !== "all" && item.theme !== selectedTheme) return false

      // Material filter
      if (selectedMaterial !== "all" && item.material !== selectedMaterial) return false

      // Price filter
      if (priceRange !== "all") {
        const price = Number.parseInt(item.price.replace(/[^0-9]/g, ""))
        switch (priceRange) {
          case "under-5000":
            if (price >= 5000) return false
            break
          case "5000-10000":
            if (price < 5000 || price >= 10000) return false
            break
          case "10000-15000":
            if (price < 10000 || price >= 15000) return false
            break
          case "over-15000":
            if (price < 15000) return false
            break
        }
      }

      return true
    })
  }, [jewelryData, selectedTheme, selectedMaterial, priceRange])

  // Categorize filtered jewelry using type field
  const earrings = filteredJewelry.filter((item: any) => item._type === "earring")
  const necklaces = filteredJewelry.filter((item: any) => item._type === "necklace")
  const head = filteredJewelry.filter((item: any) => item._type === "head")
  const hair = filteredJewelry.filter((item: any) => item._type === "hair")
  const hand = filteredJewelry.filter((item: any) => item._type === "hand")
  const foot = filteredJewelry.filter((item: any) => item._type === "foot")
  const other = filteredJewelry.filter(
    (item: any) =>
      item._type !== "earring" &&
      item._type !== "necklace" &&
      item._type !== "head" &&
      item._type !== "hair" &&
      item._type !== "hand" &&
      item._type !== "foot",
  )

  // Get current tab data
  const getCurrentTabData = () => {
    switch (activeTab) {
      case "earrings":
        return earrings
      case "necklaces":
        return necklaces
      case "head":
        return head
      case "hair":
        return hair
      case "hand":
        return hand
      case "foot":
        return foot
      case "other":
        return other
      default:
        return filteredJewelry
    }
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
              <BreadcrumbLink href="/jewellery" className="text-[#942972]">
                Jewellery
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold text-[#414141] mb-2">Jewellery Collection</h1>
        <p className="text-[#414141BF] mb-8">Discover our handcrafted jewelry pieces</p>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h3 className="font-medium text-[#414141] mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Theme filter */}
            <div>
              <label className="block text-sm font-medium text-[#414141] mb-2">Theme</label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#942972]"
              >
                {themes.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme === "all" ? "All Themes" : theme}
                  </option>
                ))}
              </select>
            </div>

            {/* Material filter */}
            <div>
              <label className="block text-sm font-medium text-[#414141] mb-2">Material</label>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#942972]"
              >
                {materials.map((material) => (
                  <option key={material} value={material}>
                    {material === "all" ? "All Materials" : material}
                  </option>
                ))}
              </select>
            </div>

            {/* Price filter */}
            <div>
              <label className="block text-sm font-medium text-[#414141] mb-2">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#942972]"
              >
                <option value="all">All Prices</option>
                <option value="under-5000">Under ₹5,000</option>
                <option value="5000-10000">₹5,000 - ₹10,000</option>
                <option value="10000-15000">₹10,000 - ₹15,000</option>
                <option value="over-15000">Over ₹15,000</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-[#414141BF]">Showing {getCurrentTabData().length} products</p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-[#414141BF]">Loading jewelry collection...</p>
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-red-500">Failed to load jewelry. Please try again later.</p>
          </div>
        )}

        {/* Jewelry content */}
        {!isLoading && !error && (
          <>
            {/* Tabbed interface for jewelry categories */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 md:grid-cols-7 mb-8 overflow-x-auto">
                <TabsTrigger value="all" className="data-[state=active]:bg-[#f8e8f3] data-[state=active]:text-[#942972]">
                  All ({filteredJewelry.length})
                </TabsTrigger>
                <TabsTrigger
                  value="earrings"
                  className="data-[state=active]:bg-[#f8e8f3] data-[state=active]:text-[#942972]"
                >
                  Earrings ({earrings.length})
                </TabsTrigger>
                <TabsTrigger
                  value="necklaces"
                  className="data-[state=active]:bg-[#f8e8f3] data-[state=active]:text-[#942972]"
                >
                  Necklaces ({necklaces.length})
                </TabsTrigger>
                <TabsTrigger value="head" className="data-[state=active]:bg-[#f8e8f3] data-[state=active]:text-[#942972]">
                  Head ({head.length})
                </TabsTrigger>
                <TabsTrigger value="hair" className="data-[state=active]:bg-[#f8e8f3] data-[state=active]:text-[#942972]">
                  Hair ({hair.length})
                </TabsTrigger>
                <TabsTrigger value="hand" className="data-[state=active]:bg-[#f8e8f3] data-[state=active]:text-[#942972]">
                  Hand ({hand.length})
                </TabsTrigger>
                <TabsTrigger value="foot" className="data-[state=active]:bg-[#f8e8f3] data-[state=active]:text-[#942972]">
                  Foot ({foot.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredJewelry.map((jewelry) => (
                    <ProductCard key={jewelry.id} product={jewelry} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="earrings" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {earrings.map((jewelry) => (
                    <ProductCard key={jewelry.id} product={jewelry} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="necklaces" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {necklaces.map((jewelry) => (
                    <ProductCard key={jewelry.id} product={jewelry} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="head" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {head.map((jewelry) => (
                    <ProductCard key={jewelry.id} product={jewelry} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="hair" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {hair.map((jewelry) => (
                    <ProductCard key={jewelry.id} product={jewelry} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="hand" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {hand.map((jewelry) => (
                    <ProductCard key={jewelry.id} product={jewelry} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="foot" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {foot.map((jewelry) => (
                    <ProductCard key={jewelry.id} product={jewelry} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>

    </main>
  )
}