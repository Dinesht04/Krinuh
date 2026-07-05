"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, ShoppingCart, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/Context/cart-context"
import { EnquiryForm } from "@/components/enquiry-form"
import { toast } from "sonner"
import { CldImage } from "next-cloudinary"

export interface Product {
  id: string | number
  name?: string
  title?: string
  price: string // Your format: "5000/-"
  originalPrice?: string
  discount?: number
  image?: string
  isBestSeller?: boolean
  cloudinaryPublicId?: string
  cloudinaryPublicIds?: string[] // Added support for multiple images
  category?: string
  // Painting specific
  size?: string
  Medium?: string
  Surface?: string
  ToBeDeliveredAs?: string
  sold?: boolean
  // Jewelry specific
  material?: string
  gemstones?: string
  weight?: string
  // Decoration specific
  dimensions?: string
  material_type?: string
  style?: string
  // Jewel and Decor Specific
  theme?: string
  // Common
  description?: string
}

interface ProductCardProps {
  product: Product
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

function getProductHref(product: Product): string {
  switch (product.category) {
    case "Jewelry":
      return `/jewellery/${product.id}`
    case "Decorations":
      return `/decorations/${product.id}`
    case "Paintings":
    default:
      return `/gallery/${product.id}`
  }
}

export function ProductCard({ product, aspectRatio = "square", width = 400, height = 400 }: ProductCardProps) {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { addToCart } = useCart()

  // Get product name (title or name)
  const productName = product.title || product.name || "Product"

  // Aggregate images for the carousel
  const images = product.cloudinaryPublicIds && product.cloudinaryPublicIds.length > 0
    ? product.cloudinaryPublicIds
    : product.cloudinaryPublicId
      ? [product.cloudinaryPublicId]
      : []
  
  const hasMultipleImages = images.length > 1
  const currentImage = images[currentImageIndex]

  // Image Navigation Handlers
  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation() // Prevents opening the Sheet
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation() // Prevents opening the Sheet
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  // Calculate original price if discount exists
  const numericPrice = Number.parseInt(product.price.replace(/[^0-9]/g, ""))
  const originalPrice = product.discount ? Math.round(numericPrice / (1 - product.discount / 100)) : null

  // Determine product type
  const isArtwork = Boolean(product.Medium || product.Surface)
  const isJewelry = Boolean(product.material || product.gemstones)
  const isDecoration = Boolean(product.dimensions || product.material_type)

  const handleAddToCart = () => {
    if (!product.sold) {
      addToCart(product)
      toast.success(`${productName} added to cart!`)
    }
  }

  const handleBuyNow = () => {
    if (!product.sold) {
      addToCart(product)
      window.location.href = "/cart"
    }
  }

  const handleEnquiry = () => {
    setShowEnquiryForm(true)
  }

  return (
    <>
      <Link href={getProductHref(product)} className="block">
        <div className="group relative cursor-pointer overflow-hidden rounded-none bg-white shadow-card-float hover:shadow-dropdown-lift transition-shadow">
            <div className="relative">
              {/* Image Container */}
              <div
                className="w-full relative flex items-center justify-center overflow-hidden bg-gray-50"
                style={{
                  aspectRatio: aspectRatio === "portrait" ? "3/4" : "1/1",
                }}
              >
                {currentImage || product.image ? (
                  <CldImage
                    src={currentImage || product.image || "/placeholder.svg"}
                    alt={`${productName} - Image ${currentImageIndex + 1}`}
                    width={500}
                    height={500}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="bg-krinuh-light w-full h-full flex items-center justify-center">
                    <div className="text-krinuh-primary text-opacity-20 text-xl font-light">
                      {productName.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                )}

                {/* Carousel Navigation Arrows */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow-dropdown-lift opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-800" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow-dropdown-lift opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-800" />
                    </button>

                    {/* Pagination Dots */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      {images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === currentImageIndex
                              ? "w-3 bg-krinuh-primary"
                              : "w-1.5 bg-gray-400/80"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <button
                className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-dropdown-lift opacity-0 group-hover:opacity-100 transition-opacity z-10"
                aria-label="Add to wishlist"
                onClick={(e) => {
                  e.stopPropagation()
                  // Add wishlist logic here
                }}
              >
                <Heart size={18} className="text-krinuh-primary" />
              </button>

              {product.discount && (
                <div className="absolute top-2 left-2 bg-krinuh-primary text-white text-xs font-bold px-2 py-1 rounded-none z-10">
                  {product.discount}% OFF
                </div>
              )}

              {product.isBestSeller && (
                <div className="absolute top-2 left-2 bg-krinuh-primary text-white text-xs font-bold px-2 py-1 rounded-none z-10">
                  Best Seller
                </div>
              )}

              {product.sold && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                  <span className="text-white font-bold text-lg">SOLD</span>
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-sm font-medium text-krinuh-text mb-1 truncate">{productName}</h3>
              {product.theme && <p className="text-xs text-krinuh-primary mb-1">{product.theme}</p>}
              <div className="flex items-center gap-2 mb-3">
                <span className="font-semibold text-krinuh-primary">₹{product.price}</span>
                {originalPrice && <span className="text-sm text-gray-500 line-through">₹{originalPrice}/-</span>}
              </div>

              {/* Quick action button: Add to Cart, or Enquire if sold out */}
              {product.sold ? (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-krinuh-primary text-krinuh-primary hover:bg-krinuh-light rounded-none relative z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEnquiry()
                  }}
                >
                  <MessageSquare size={16} className="mr-2" />
                  Enquire
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="w-full bg-white border-2 border-krinuh-primary text-krinuh-primary hover:bg-krinuh-primary hover:text-white transition-colors rounded-none relative z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddToCart()
                  }}
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
      </Link>

      {/* Enquiry Form */}
      <EnquiryForm
        isOpen={showEnquiryForm}
        onClose={() => setShowEnquiryForm(false)}
        product={product}
        enquiryType="product"
        category={product.category?.toLowerCase() as "paintings" | "jewelry" | "decorations"}
      />
    </>
  )
}
