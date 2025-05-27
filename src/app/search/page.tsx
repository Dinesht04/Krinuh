"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import { ProductCard, type Product } from "@/components/product-card"
import { searchProducts } from "@/lib/search-utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState(query)
  const [activeTab, setActiveTab] = useState("all")

  // Perform search when query changes
  useEffect(() => {
    if (query) {
      const results = searchProducts(query)
      setSearchResults(results)
      setSearchQuery(query)
    }
  }, [query])

  // Filter results by category
  const filteredResults =
    activeTab === "all"
      ? searchResults
      : searchResults.filter((product) => product.category?.toLowerCase() === activeTab.toLowerCase())

  // Count products by category
  const paintingsCount = searchResults.filter((p) => p.category === "Paintings").length
  const jewelryCount = searchResults.filter((p) => p.category === "Jewelry").length
  const decorationsCount = searchResults.filter((p) => p.category === "Decorations").length

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Update URL with new search query
      const url = new URL(window.location.href)
      url.searchParams.set("q", searchQuery)
      window.history.pushState({}, "", url.toString())

      // Update search results
      const results = searchProducts(searchQuery)
      setSearchResults(results)
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
              <BreadcrumbLink href="/search" className="text-[#942972]">
                Search Results
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Search form */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#414141BF]" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-[#942972] hover:bg-[#7b1d5e]">
              Search
            </Button>
          </form>
        </div>

        {/* Search results */}
        <div>
          <h1 className="text-2xl font-bold text-[#414141] mb-2">
            {searchResults.length > 0 ? `Search Results for "${query}"` : `No results found for "${query}"`}
          </h1>
          <p className="text-[#414141BF] mb-6">
            {searchResults.length > 0
              ? `Found ${searchResults.length} products`
              : "Try a different search term or browse our categories below"}
          </p>

          {searchResults.length > 0 && (
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-[#f8e8f3] data-[state=active]:text-[#942972]"
                >
                  All ({searchResults.length})
                </TabsTrigger>
                <TabsTrigger
                  value="Paintings"
                  className="data-[state=active]:bg-[#f8e8f3] data-[state=active]:text-[#942972]"
                >
                  Paintings ({paintingsCount})
                </TabsTrigger>
                <TabsTrigger
                  value="Jewelry"
                  className="data-[state=active]:bg-[#f8e8f3] data-[state=active]:text-[#942972]"
                >
                  Jewelry ({jewelryCount})
                </TabsTrigger>
                <TabsTrigger
                  value="Decorations"
                  className="data-[state=active]:bg-[#f8e8f3] data-[state=active]:text-[#942972]"
                >
                  Decorations ({decorationsCount})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredResults.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="Paintings" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredResults.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="Jewelry" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredResults.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="Decorations" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredResults.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}

          {/* No results suggestions */}
          {searchResults.length === 0 && (
            <div className="py-8">
              <h2 className="text-xl font-semibold text-[#414141] mb-4">Popular Categories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#f8e8f3] rounded-lg p-6 text-center hover:bg-[#f0d8eb] transition-colors">
                  <h3 className="text-lg font-medium text-[#942972] mb-2">Paintings</h3>
                  <p className="text-[#414141BF] mb-4">Explore our collection of original paintings</p>
                  <Button
                    variant="outline"
                    className="border-[#942972] text-[#942972] hover:bg-[#f0d8eb]"
                    onClick={() => {
                      setSearchQuery("Paintings")
                      handleSearch(new Event("submit") as any)
                    }}
                  >
                    Browse Paintings
                  </Button>
                </div>

                <div className="bg-[#f8e8f3] rounded-lg p-6 text-center hover:bg-[#f0d8eb] transition-colors">
                  <h3 className="text-lg font-medium text-[#942972] mb-2">Jewelry</h3>
                  <p className="text-[#414141BF] mb-4">Discover our handcrafted jewelry pieces</p>
                  <Button
                    variant="outline"
                    className="border-[#942972] text-[#942972] hover:bg-[#f0d8eb]"
                    onClick={() => {
                      setSearchQuery("Jewelry")
                      handleSearch(new Event("submit") as any)
                    }}
                  >
                    Browse Jewelry
                  </Button>
                </div>

                <div className="bg-[#f8e8f3] rounded-lg p-6 text-center hover:bg-[#f0d8eb] transition-colors">
                  <h3 className="text-lg font-medium text-[#942972] mb-2">Decorations</h3>
                  <p className="text-[#414141BF] mb-4">Transform your space with our decorative pieces</p>
                  <Button
                    variant="outline"
                    className="border-[#942972] text-[#942972] hover:bg-[#f0d8eb]"
                    onClick={() => {
                      setSearchQuery("Decorations")
                      handleSearch(new Event("submit") as any)
                    }}
                  >
                    Browse Decorations
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </main>
  )
}
