"use client"
import { useState, useMemo } from "react"
import Navbar from "@/components/Navbar"
import { ProductCard } from "@/components/product-card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { decorationsData } from "@/v2/sampleData"

export default function DecorationsPage() {
  const [selectedTheme, setSelectedTheme] = useState<string>("all")
  const [selectedMaterial, setSelectedMaterial] = useState<string>("all")
  const [selectedStyle, setSelectedStyle] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<string>("all")

  // Get unique values for filters
  const themes = useMemo(() => {
    const allThemes = decorationsData.map((item) => item.theme).filter(Boolean)
    return ["all", ...Array.from(new Set(allThemes))]
  }, [])

  const materials = useMemo(() => {
    const allMaterials = decorationsData.map((item) => item.material_type).filter(Boolean)
    return ["all", ...Array.from(new Set(allMaterials))]
  }, [])

  const styles = useMemo(() => {
    const allStyles = decorationsData.map((item) => item.style).filter(Boolean)
    return ["all", ...Array.from(new Set(allStyles))]
  }, [])

  // Filter decorations based on selected filters
  const filteredDecorations = useMemo(() => {
    return decorationsData.filter((item) => {
      // Theme filter
      if (selectedTheme !== "all" && item.theme !== selectedTheme) return false

      // Material filter
      if (selectedMaterial !== "all" && item.material_type !== selectedMaterial) return false

      // Style filter
      if (selectedStyle !== "all" && item.style !== selectedStyle) return false

      // Price filter
      if (priceRange !== "all") {
        const price = Number.parseInt(item.price.replace(/[^0-9]/g, ""))
        switch (priceRange) {
          case "under-3000":
            if (price >= 3000) return false
            break
          case "3000-5000":
            if (price < 3000 || price >= 5000) return false
            break
          case "5000-8000":
            if (price < 5000 || price >= 8000) return false
            break
          case "over-8000":
            if (price < 8000) return false
            break
        }
      }

      return true
    })
  }, [selectedTheme, selectedMaterial, selectedStyle, priceRange])

  const clearFilters = () => {
    setSelectedTheme("all")
    setSelectedMaterial("all")
    setSelectedStyle("all")
    setPriceRange("all")
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
              <BreadcrumbLink href="/decorations" className="text-[#942972]">
                Decorations
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold text-[#414141] mb-2">Home Decorations</h1>
        <p className="text-[#414141BF] mb-8">Transform your space with our unique decorative pieces</p>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters */}
          <div className="md:w-1/4 lg:w-1/5">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#414141]">Filters</h2>
                <Filter size={18} className="text-[#942972]" />
              </div>

              {/* Theme filter */}
              <div className="mb-4">
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
              <div className="mb-4">
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

              {/* Style filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#414141] mb-2">Style</label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#942972]"
                >
                  {styles.map((style) => (
                    <option key={style} value={style}>
                      {style === "all" ? "All Styles" : style}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#414141] mb-2">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#942972]"
                >
                  <option value="all">All Prices</option>
                  <option value="under-3000">Under ₹3,000</option>
                  <option value="3000-5000">₹3,000 - ₹5,000</option>
                  <option value="5000-8000">₹5,000 - ₹8,000</option>
                  <option value="over-8000">Over ₹8,000</option>
                </select>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full bg-[#942972] hover:bg-[#7b1d5e]"
                  onClick={() => {
                    /* Filters are applied automatically */
                  }}
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#942972] text-[#942972] hover:bg-[#f8e8f3]"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="md:w-3/4 lg:w-4/5">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[#414141BF]">Sort by:</span>
                <select className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#942972]">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>

              <div className="text-[#414141BF] text-sm">Showing {filteredDecorations.length} products</div>
            </div>

            {/* Product grid with featured items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Featured item - larger */}
              {filteredDecorations.length > 0 && (
                <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
                  <ProductCard product={filteredDecorations[0]} aspectRatio="portrait" />
                </div>
              )}

              {/* Regular items */}
              {filteredDecorations
                .slice(1) // Skip the featured item
                .map((decoration) => (
                  <div key={decoration.id}>
                    <ProductCard product={decoration} />
                  </div>
                ))}

            </div>
              {/* No results message */}
              {filteredDecorations.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-[#414141] mb-2">No products found</h3>
                  <p className="text-[#414141BF] mb-4">Try adjusting your filters to see more results</p>
                  <Button onClick={clearFilters} className="bg-[#942972] hover:bg-[#7b1d5e]">
                    Clear Filters
                  </Button>
                </div>
              )}
          </div>
        </div>
      </div>

    </main>
  )
}
