"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { searchProducts, getSearchSuggestions } from "@/lib/search-utils"
import type { Product } from "@/components/product-card"

interface SearchContextType {
  query: string
  setQuery: (query: string) => void
  results: Product[]
  suggestions: string[]
  recentSearches: string[]
  addRecentSearch: (search: string) => void
  clearRecentSearches: () => void
  isLoading: boolean
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  // Update search results when query changes
  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true)
      // Simulate network delay for better UX
      const timer = setTimeout(() => {
        const searchResults = searchProducts(query)
        setResults(searchResults)
        setIsLoading(false)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setResults([])
      setIsLoading(false)
    }
  }, [query])

  // Update suggestions when query changes
  useEffect(() => {
    if (query.trim().length > 1) {
      const newSuggestions = getSearchSuggestions(query)
      setSuggestions(newSuggestions)
    } else {
      setSuggestions([])
    }
  }, [query])

  // Add a search term to recent searches
  const addRecentSearch = (search: string) => {
    if (!search.trim()) return

    const updatedSearches = [search, ...recentSearches.filter((s) => s !== search)].slice(0, 5)

    setRecentSearches(updatedSearches)
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
  }

  // Clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        results,
        suggestions,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
        isLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
