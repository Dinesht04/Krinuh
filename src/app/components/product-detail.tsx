"use client"

import { useState } from "react"
import { Heart, ShoppingCart, MessageSquare, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useCart } from "@/Context/cart-context"
import { EnquiryForm } from "@/components/enquiry-form"
import { ProductCarousel } from "@/components/product-carousel"
import { toast } from "sonner"
import { CldImage } from "next-cloudinary"
import type { Product } from "@/components/product-card"

interface ProductDetailProps {
  product: Product
  recommended?: Product[]
}

export function ProductDetail({ product, recommended = [] }: ProductDetailProps) {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const productName = product.title || product.name || "Product"

  const images =
    product.cloudinaryPublicIds && product.cloudinaryPublicIds.length > 0
      ? product.cloudinaryPublicIds
      : product.cloudinaryPublicId
        ? [product.cloudinaryPublicId]
        : []

  const hasMultipleImages = images.length > 1
  const currentImage = images[currentImageIndex]

  const numericPrice = Number.parseInt(product.price.replace(/[^0-9]/g, ""))
  const originalPrice = product.discount ? Math.round(numericPrice / (1 - product.discount / 100)) : null

  const isArtwork = Boolean(product.Medium || product.Surface)
  const isJewelry = Boolean(product.material || product.gemstones)
  const isDecoration = Boolean(product.dimensions || product.material_type)

  const handleAddToCart = () => {
    if (!product.sold) {
      addToCart(product, quantity)
      toast.success(`${productName} added to cart!`)
    }
  }

  const handleBuyNow = () => {
    if (!product.sold) {
      addToCart(product, quantity)
      window.location.href = "/cart"
    }
  }

  const hasSpecs =
    Boolean(product.size || product.Medium || product.Surface || product.ToBeDeliveredAs) ||
    Boolean(product.material || product.gemstones || product.weight) ||
    Boolean(product.dimensions || product.material_type || product.style)

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image gallery */}
        <div className="lg:w-1/2">
          <div className="flex gap-3">
            {hasMultipleImages && (
              <div className="hidden md:flex flex-col gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-16 h-16 rounded-none overflow-hidden border-2 flex-shrink-0 ${
                      idx === currentImageIndex ? "border-krinuh-primary" : "border-transparent"
                    }`}
                  >
                    <CldImage
                      src={img}
                      alt={`${productName} thumbnail ${idx + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="relative flex-1 aspect-square flex items-center justify-center overflow-hidden bg-gray-50 group rounded-none">
              {currentImage || product.image ? (
                <CldImage
                  src={currentImage || product.image || "/placeholder.svg"}
                  alt={`${productName} - Image ${currentImageIndex + 1}`}
                  width={700}
                  height={700}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="bg-krinuh-light w-full h-full flex items-center justify-center">
                  <div className="text-krinuh-primary text-opacity-20 text-6xl font-light">
                    {productName.substring(0, 2).toUpperCase()}
                  </div>
                </div>
              )}

              {product.isBestSeller && (
                <Badge className="absolute top-2 left-2 bg-krinuh-primary">Best Seller</Badge>
              )}

              <button
                className="absolute bottom-3 left-3 p-2 bg-white rounded-full shadow-dropdown-lift"
                aria-label="Add to wishlist"
              >
                <Heart size={18} className="text-krinuh-primary" />
              </button>

              {product.sold && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SOLD</span>
                </div>
              )}

              {hasMultipleImages && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-dropdown-lift opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-dropdown-lift opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentImageIndex ? "w-4 bg-krinuh-primary" : "w-2 bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Product details */}
        <div className="lg:w-1/2">
          <h1 className="text-2xl md:text-3xl font-semibold text-krinuh-text mb-2">{productName}</h1>
          <p className="text-krinuh-text/75 mb-4">
            {isArtwork && "Original Artwork"}
            {isJewelry && "Handcrafted Jewelry"}
            {isDecoration && "Home Decoration"}
            {product.theme && ` • ${product.theme} Theme`}
          </p>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold text-krinuh-primary">₹{product.price}</span>
            {originalPrice && <span className="text-krinuh-text/50 line-through">₹{originalPrice}/-</span>}
            {product.discount && (
              <Badge className="bg-krinuh-primary">{product.discount}% OFF</Badge>
            )}
            {product.sold && <Badge variant="destructive">Sold</Badge>}
          </div>

          {!product.sold && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-krinuh-text mb-2">Quantity</label>
              <div className="flex items-center border border-krinuh-hairline w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-krinuh-light"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 hover:bg-krinuh-light"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}

          {!product.sold ? (
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button
                variant="outline"
                className="border-2 border-krinuh-primary text-krinuh-primary hover:bg-krinuh-light rounded-none"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={16} className="mr-2" />
                Add to Cart
              </Button>
              <Button
                className="bg-krinuh-primary text-white hover:bg-krinuh-primary/90 rounded-none"
                onClick={handleBuyNow}
              >
                Buy It Now
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full mb-6 border-krinuh-primary text-krinuh-primary hover:bg-krinuh-light rounded-none"
              onClick={() => setShowEnquiryForm(true)}
            >
              <MessageSquare size={16} className="mr-2" />
              Enquire
            </Button>
          )}

          <Accordion type="single" collapsible className="w-full">
            {product.description && (
              <AccordionItem value="description">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent className="text-krinuh-text/75 leading-relaxed">
                  {product.description}
                </AccordionContent>
              </AccordionItem>
            )}

            {hasSpecs && (
              <AccordionItem value="details">
                <AccordionTrigger>Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {isArtwork && (
                      <>
                        {product.size && (
                          <div className="flex justify-between">
                            <span className="text-krinuh-text/75">Size:</span>
                            <span className="font-medium text-krinuh-text">{product.size}</span>
                          </div>
                        )}
                        {product.Medium && (
                          <div className="flex justify-between">
                            <span className="text-krinuh-text/75">Medium:</span>
                            <span className="font-medium text-krinuh-text">{product.Medium}</span>
                          </div>
                        )}
                        {product.Surface && (
                          <div className="flex justify-between">
                            <span className="text-krinuh-text/75">Surface:</span>
                            <span className="font-medium text-krinuh-text">{product.Surface}</span>
                          </div>
                        )}
                        {product.ToBeDeliveredAs && (
                          <div className="flex justify-between">
                            <span className="text-krinuh-text/75">Delivered As:</span>
                            <span className="font-medium text-krinuh-text">{product.ToBeDeliveredAs}</span>
                          </div>
                        )}
                      </>
                    )}
                    {isJewelry && (
                      <>
                        {product.material && (
                          <div className="flex justify-between">
                            <span className="text-krinuh-text/75">Material:</span>
                            <span className="font-medium text-krinuh-text">{product.material}</span>
                          </div>
                        )}
                        {product.gemstones && (
                          <div className="flex justify-between">
                            <span className="text-krinuh-text/75">Gemstones:</span>
                            <span className="font-medium text-krinuh-text">{product.gemstones}</span>
                          </div>
                        )}
                        {product.weight && (
                          <div className="flex justify-between">
                            <span className="text-krinuh-text/75">Weight:</span>
                            <span className="font-medium text-krinuh-text">{product.weight}</span>
                          </div>
                        )}
                      </>
                    )}
                    {isDecoration && (
                      <>
                        {product.dimensions && (
                          <div className="flex justify-between">
                            <span className="text-krinuh-text/75">Dimensions:</span>
                            <span className="font-medium text-krinuh-text">{product.dimensions}</span>
                          </div>
                        )}
                        {product.material_type && (
                          <div className="flex justify-between">
                            <span className="text-krinuh-text/75">Material:</span>
                            <span className="font-medium text-krinuh-text">{product.material_type}</span>
                          </div>
                        )}
                        {product.style && (
                          <div className="flex justify-between">
                            <span className="text-krinuh-text/75">Style:</span>
                            <span className="font-medium text-krinuh-text">{product.style}</span>
                          </div>
                        )}
                      </>
                    )}
                    {product.theme && (
                      <div className="flex justify-between">
                        <span className="text-krinuh-text/75">Theme:</span>
                        <span className="font-medium text-krinuh-text">{product.theme}</span>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </div>

      {recommended.length > 0 && (
        <ProductCarousel title="Recommended Products" products={recommended} className="mt-12 -mx-4" />
      )}

      <EnquiryForm
        isOpen={showEnquiryForm}
        onClose={() => setShowEnquiryForm(false)}
        product={product}
        enquiryType="product"
        category={product.category?.toLowerCase() as "paintings" | "jewelry" | "decorations"}
      />
    </div>
  )
}
