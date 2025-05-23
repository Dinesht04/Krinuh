import type { Product } from "@/components/product-card"
import { paintingsData, jewelryData, decorationsData } from "@/v2/sampleData"

// Combine all products for global search
export const allProducts = [...paintingsData, ...jewelryData, ...decorationsData]

export function searchProducts(query: string): Product[] {
  if (!query || query.trim() === "") {
    return []
  }

  const searchTerm = query.toLowerCase().trim()

  return allProducts.filter((product) => {
    const name = (product.name || product.title || "").toLowerCase()
    const description = (product.description || "").toLowerCase()
    const category = (product.category || "").toLowerCase()

    // Search in specific fields based on product type
    const mediumMatch = product.Medium?.toLowerCase().includes(searchTerm) || false
    const materialMatch =
      product.material?.toLowerCase().includes(searchTerm) ||
      product.material_type?.toLowerCase().includes(searchTerm) ||
      false
    const styleMatch = product.style?.toLowerCase().includes(searchTerm) || false
    const gemstonesMatch = product.gemstones?.toLowerCase().includes(searchTerm) || false

    // Return true if any field matches the search term
    return (
      name.includes(searchTerm) ||
      description.includes(searchTerm) ||
      category.includes(searchTerm) ||
      mediumMatch ||
      materialMatch ||
      styleMatch ||
      gemstonesMatch
    )
  })
}

// Get search suggestions based on partial input
export function getSearchSuggestions(partialQuery: string, limit = 5): string[] {
  if (!partialQuery || partialQuery.trim() === "") {
    return []
  }

  const searchTerm = partialQuery.toLowerCase().trim()
  const matches = new Set<string>()

  // Add product names/titles
  allProducts.forEach((product) => {
    const name = product.name || product.title || ""
    if (name.toLowerCase().includes(searchTerm)) {
      matches.add(name)
    }
  })

  // Add categories
  const categories = ["Paintings", "Jewelry", "Decorations"]
  categories.forEach((category) => {
    if (category.toLowerCase().includes(searchTerm)) {
      matches.add(category)
    }
  })

  // Add materials, styles, etc.
  allProducts.forEach((product) => {
    if (product.Medium && product.Medium.toLowerCase().includes(searchTerm)) {
      matches.add(product.Medium)
    }
    if (product.material && product.material.toLowerCase().includes(searchTerm)) {
      matches.add(product.material)
    }
    if (product.style && product.style.toLowerCase().includes(searchTerm)) {
      matches.add(product.style)
    }
  })

  return Array.from(matches).slice(0, limit)
}
