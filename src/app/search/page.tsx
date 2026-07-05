"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import { ProductCard, type Product } from "@/components/product-card"
import { ProductFilters, type FilterGroup } from "@/components/product-filters"
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

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState(query)
  const [category, setCategory] = useState("all")

  useEffect(() => {
    if (query) {
      setSearchResults(searchProducts(query))
      setSearchQuery(query)
    }
  }, [query])

  const filteredResults =
    category === "all"
      ? searchResults
      : searchResults.filter((product) => product.category?.toLowerCase() === category.toLowerCase())

  const paintingsCount = searchResults.filter((p) => p.category === "Paintings").length
  const jewelryCount = searchResults.filter((p) => p.category === "Jewelry").length
  const decorationsCount = searchResults.filter((p) => p.category === "Decorations").length

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const url = new URL(window.location.href)
      url.searchParams.set("q", searchQuery)
      window.history.pushState({}, "", url.toString())
      setSearchResults(searchProducts(searchQuery))
      setCategory("all")
    }
  }

  const groups: FilterGroup[] = [
    {
      key: "category",
      label: "Category",
      value: category,
      onChange: setCategory,
      options: [
        { value: "all", label: "All", count: searchResults.length },
        { value: "Paintings", label: "Paintings", count: paintingsCount },
        { value: "Jewelry", label: "Jewellery", count: jewelryCount },
        { value: "Decorations", label: "Decorations", count: decorationsCount },
      ],
    },
  ]

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
              <BreadcrumbLink href="/search" className="text-krinuh-primary">
                Search Results
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Search form */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-krinuh-text/75" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 rounded-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="bg-white border-2 border-krinuh-primary text-krinuh-primary hover:bg-krinuh-primary hover:text-white transition-colors rounded-none"
            >
              Search
            </Button>
          </form>
        </div>

        {/* Results */}
        <div>
          <h1 className="font-serif text-2xl font-medium text-krinuh-ink mb-2">
            {searchResults.length > 0 ? `Results for "${query}"` : `No results found for "${query}"`}
          </h1>
          <p className="text-krinuh-text/75 mb-6">
            {searchResults.length > 0
              ? `Found ${searchResults.length} products`
              : "Try a different search term or browse our categories below"}
          </p>

          {searchResults.length > 0 && (
            <>
              <ProductFilters
                groups={groups}
                resultCount={filteredResults.length}
                activeCount={category !== "all" ? 1 : 0}
                onClear={() => setCategory("all")}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}

          {/* No results suggestions */}
          {searchResults.length === 0 && (
            <div className="py-8">
              <h2 className="font-serif text-xl font-medium text-krinuh-ink mb-4">Popular Categories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: "Paintings", copy: "Explore our collection of original paintings" },
                  { name: "Jewellery", copy: "Discover our handcrafted jewellery pieces" },
                  { name: "Decorations", copy: "Transform your space with our decorative pieces" },
                ].map((c) => (
                  <div key={c.name} className="bg-krinuh-light rounded-none p-6 text-center">
                    <h3 className="font-serif text-lg font-medium text-krinuh-primary mb-2">{c.name}</h3>
                    <p className="text-krinuh-text/75 mb-4">{c.copy}</p>
                    <Button
                      variant="outline"
                      className="border-krinuh-primary text-krinuh-primary hover:bg-krinuh-primary hover:text-white transition-colors rounded-none"
                      onClick={() => {
                        setSearchQuery(c.name)
                        handleSearch(new Event("submit") as any)
                      }}
                    >
                      Browse {c.name}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
