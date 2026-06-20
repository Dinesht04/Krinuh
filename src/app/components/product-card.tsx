"use client"

import { useState } from "react"
import { Heart, ShoppingCart, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
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

export function ProductCard({ product, aspectRatio = "square", width = 400, height = 400 }: ProductCardProps) {
  const [isOpen, setIsOpen] = useState(false)
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
    setIsOpen(false)
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <div className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
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
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="bg-[#f8e8f3] w-full h-full flex items-center justify-center">
                    <div className="text-[#942972] text-opacity-20 text-xl font-light">
                      {productName.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                )}

                {/* Carousel Navigation Arrows */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-800" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
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
                              ? "w-3 bg-[#942972]"
                              : "w-1.5 bg-gray-400/80"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <button
                className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
                aria-label="Add to wishlist"
                onClick={(e) => {
                  e.stopPropagation()
                  // Add wishlist logic here
                }}
              >
                <Heart size={18} className="text-[#942972]" />
              </button>

              {product.discount && (
                <div className="absolute top-2 left-2 bg-[#F36F4A] text-white text-xs font-bold px-2 py-1 rounded z-10">
                  {product.discount}% OFF
                </div>
              )}

              {product.isBestSeller && (
                <div className="absolute top-2 left-2 bg-[#942972] text-white text-xs font-bold px-2 py-1 rounded z-10">
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
              <h3 className="text-sm font-medium text-[#414141] mb-1 truncate">{productName}</h3>
              {product.theme && <p className="text-xs text-[#942972] mb-1">{product.theme}</p>}
              <div className="flex items-center gap-2 mb-3">
                <span className="font-semibold text-[#942972]">₹{product.price}</span>
                {originalPrice && <span className="text-sm text-gray-500 line-through">₹{originalPrice}/-</span>}
              </div>

              {/* Quick action button: Add to Cart, or Enquire if sold out */}
              {product.sold ? (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-[#942972] text-[#942972] hover:bg-[#f8e8f3] relative z-10"
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
                  className="w-full bg-[#942972] hover:bg-[#7b1d5e] text-white relative z-10"
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
        </SheetTrigger>

        <SheetContent side="bottom" className="h-[90vh] sm:h-[85vh] flex flex-col">
          <SheetHeader className="flex-shrink-0">
            <SheetTitle className="text-xl text-[#942972]">{productName}</SheetTitle>
            <SheetDescription className="text-[#414141BF]">
              {isArtwork && "Original Artwork"}
              {isJewelry && "Handcrafted Jewelry"}
              {isDecoration && "Home Decoration"}
              {product.theme && ` • ${product.theme} Theme`}
            </SheetDescription>
          </SheetHeader>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto px-0 py-4">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Product image (Sheet View) */}
              <div className="lg:w-1/2">
                <div className="rounded-lg aspect-square relative flex items-center justify-center overflow-hidden bg-gray-50 group">
                  {currentImage || product.image ? (
                    <CldImage
                      src={currentImage || product.image || "/placeholder.svg"}
                      alt={`${productName} - Image ${currentImageIndex + 1}`}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="bg-[#f8e8f3] w-full h-full flex items-center justify-center rounded-lg">
                      <div className="text-[#942972] text-opacity-20 text-6xl font-light">
                        {productName.substring(0, 2).toUpperCase()}
                      </div>
                    </div>
                  )}

                  {/* Carousel inside the Sheet view */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-800" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-800" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/20 px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        {images.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-2 rounded-full transition-all ${
                              idx === currentImageIndex ? "w-4 bg-white" : "w-2 bg-white/60"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Product details */}
              <div className="lg:w-1/2">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#414141]">{productName}</h3>
                    {product.theme && <p className="text-sm text-[#942972] mb-1">{product.theme} Theme</p>}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xl font-bold text-[#942972]">₹{product.price}</span>
                      {originalPrice && <span className="text-sm text-gray-500 line-through">₹{originalPrice}/-</span>}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {product.isBestSeller && <Badge className="bg-[#942972]">Best Seller</Badge>}
                    {product.sold && <Badge variant="destructive">Sold</Badge>}
                  </div>
                </div>

                {/* Specifications */}
                <div className="space-y-3 mb-6">
                  {/* Artwork specific details */}
                  {isArtwork && (
                    <>
                      {product.size && (
                        <div className="flex justify-between">
                          <span className="text-sm text-[#414141BF]">Size:</span>
                          <span className="text-sm font-medium text-[#414141]">{product.size}</span>
                        </div>
                      )}
                      {product.Medium && (
                        <div className="flex justify-between">
                          <span className="text-sm text-[#414141BF]">Medium:</span>
                          <span className="text-sm font-medium text-[#414141]">{product.Medium}</span>
                        </div>
                      )}
                      {product.Surface && (
                        <div className="flex justify-between">
                          <span className="text-sm text-[#414141BF]">Surface:</span>
                          <span className="text-sm font-medium text-[#414141]">{product.Surface}</span>
                        </div>
                      )}
                      {product.ToBeDeliveredAs && (
                        <div className="flex justify-between">
                          <span className="text-sm text-[#414141BF]">Delivered As:</span>
                          <span className="text-sm font-medium text-[#414141]">{product.ToBeDeliveredAs}</span>
                        </div>
                      )}
                    </>
                  )}

                  {/* Jewelry specific details */}
                  {isJewelry && (
                    <>
                      {product.material && (
                        <div className="flex justify-between">
                          <span className="text-sm text-[#414141BF]">Material:</span>
                          <span className="text-sm font-medium text-[#414141]">{product.material}</span>
                        </div>
                      )}
                      {product.gemstones && (
                        <div className="flex justify-between">
                          <span className="text-sm text-[#414141BF]">Gemstones:</span>
                          <span className="text-sm font-medium text-[#414141]">{product.gemstones}</span>
                        </div>
                      )}
                      {product.weight && (
                        <div className="flex justify-between">
                          <span className="text-sm text-[#414141BF]">Weight:</span>
                          <span className="text-sm font-medium text-[#414141]">{product.weight}</span>
                        </div>
                      )}
                      {product.theme && (
                        <div className="flex justify-between">
                          <span className="text-sm text-[#414141BF]">Theme:</span>
                          <span className="text-sm font-medium text-[#414141]">{product.theme}</span>
                        </div>
                      )}
                    </>
                  )}

                  {/* Decoration specific details */}
                  {isDecoration && (
                    <>
                      {product.dimensions && (
                        <div className="flex justify-between">
                          <span className="text-sm text-[#414141BF]">Dimensions:</span>
                          <span className="text-sm font-medium text-[#414141]">{product.dimensions}</span>
                        </div>
                      )}
                      {product.material_type && (
                        <div className="flex justify-between">
                          <span className="text-sm text-[#414141BF]">Material:</span>
                          <span className="text-sm font-medium text-[#414141]">{product.material_type}</span>
                        </div>
                      )}
                      {product.style && (
                        <div className="flex justify-between">
                          <span className="text-sm text-[#414141BF]">Style:</span>
                          <span className="text-sm font-medium text-[#414141]">{product.style}</span>
                        </div>
                      )}
                      {product.theme && (
                        <div className="flex justify-between">
                          <span className="text-sm text-[#414141BF]">Theme:</span>
                          <span className="text-sm font-medium text-[#414141]">{product.theme}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#414141] mb-2">Description</h4>
                    <p className="text-sm text-[#414141BF] leading-relaxed">{product.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Fixed footer with action buttons */}
          <SheetFooter className="flex-shrink-0 border-t pt-4">
            <div className="w-full space-y-3">
              {!product.sold ? (
                <>
                  <Button className="w-full bg-[#942972] hover:bg-[#7b1d5e] text-white" onClick={handleAddToCart}>
                    <ShoppingCart size={16} className="mr-2" />
                    Add to Cart
                  </Button>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      className="border-[#942972] text-[#942972] hover:bg-[#f8e8f3] bg-transparent"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#942972] text-[#942972] hover:bg-[#f8e8f3] bg-transparent"
                      onClick={handleEnquiry}
                    >
                      <MessageSquare size={16} className="mr-1" />
                      Enquire
                    </Button>
                    <SheetClose asChild>
                      <Button variant="outline">Close</Button>
                    </SheetClose>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Button disabled className="w-full">
                    Sold Out
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="border-[#942972] text-[#942972] hover:bg-[#f8e8f3] bg-transparent"
                      onClick={handleEnquiry}
                    >
                      <MessageSquare size={16} className="mr-1" />
                      Enquire
                    </Button>
                    <SheetClose asChild>
                      <Button variant="outline">Close</Button>
                    </SheetClose>
                  </div>
                </div>
              )}
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

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