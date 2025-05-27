"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { getSearchSuggestions } from "@/lib/search-utils"

interface SearchDialogProps {
  children?: React.ReactNode
  className?: string
}

export function SearchDialog({ children, className }: SearchDialogProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  // Focus input when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

  // Update suggestions when query changes
  useEffect(() => {
    if (query.trim().length > 1) {
      const newSuggestions = getSearchSuggestions(query)
      setSuggestions(newSuggestions)
    } else {
      setSuggestions([])
    }
  }, [query])

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    // Save to recent searches
    const updatedSearches = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5)

    setRecentSearches(updatedSearches)
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))

    // Navigate to search results
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    setOpen(false)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="icon" className={className} aria-label="Search products">
            <Search className="h-5 w-5" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">Search products</DialogTitle>
        </DialogHeader>
        <div className="flex items-center border-b pb-4">
          <Search className="mr-2 h-5 w-5 shrink-0 text-[#942972]" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, categories, materials..."
            className="flex-1 border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(query)
              }
            }}
          />
          {query && (
            <Button variant="ghost" size="icon" onClick={() => setQuery("")} aria-label="Clear search">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-medium text-[#414141]">Suggestions</h3>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={`suggestion-${index}`}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-[#414141BF] hover:text-[#942972] hover:bg-[#f8e8f3]"
                    onClick={() => handleSearch(suggestion)}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    {suggestion}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recent searches */}
        {recentSearches.length > 0 && !query && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-[#414141]">Recent Searches</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-[#414141BF] hover:text-[#942972]"
                onClick={clearRecentSearches}
              >
                Clear all
              </Button>
            </div>
            <ul className="space-y-2">
              {recentSearches.map((search, index) => (
                <li key={`recent-${index}`} className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    className="justify-start text-[#414141BF] hover:text-[#942972] hover:bg-[#f8e8f3]"
                    onClick={() => handleSearch(search)}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    {search}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleSearch(search)}
                    aria-label={`Search for ${search}`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Popular categories */}
        {!query && recentSearches.length === 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-medium text-[#414141]">Popular Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {["Paintings", "Jewelry", "Decorations", "Earrings", "Necklaces", "Wall Art"].map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  className="justify-start text-[#414141BF] hover:text-[#942972] hover:bg-[#f8e8f3] border-[#e0e0e0]"
                  onClick={() => handleSearch(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
