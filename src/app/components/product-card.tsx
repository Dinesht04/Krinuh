"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Badge } from "@/components/ui/badge"
import { CldImage } from "next-cloudinary"

// Updated Product interface to match your data structure
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
  category?: string

  // Painting specific
  size?: string
  Medium?: string
  Surface?: string
  ToBeDeliveredAs?: string
  Sold?: boolean

  // Jewelry specific
  material?: string
  gemstones?: string
  weight?: string

  // Decoration specific
  dimensions?: string
  material_type?: string
  style?: string

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

  // Get product name (title or name)
  const productName = product.title || product.name || "Product"

  // Handle Cloudinary image URL
  const getImageUrl = () => {
    if (product.cloudinaryPublicId) {
      return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1/paintings/${product.cloudinaryPublicId}`
    }
    return product.image || null
  }

  const imageUrl = getImageUrl()

  // Calculate original price if discount exists
  const numericPrice = Number.parseInt(product.price.replace(/[^0-9]/g, ""))
  const originalPrice = product.discount ? Math.round(numericPrice / (1 - product.discount / 100)) : null

  // Determine product type
  const isArtwork = Boolean(product.Medium || product.Surface)
  const isJewelry = Boolean(product.material || product.gemstones)
  const isDecoration = Boolean(product.dimensions || product.material_type)

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <div className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="relative">
            {/* Image with Cloudinary support */}
            <div
              className="w-full aspect-square flex items-center justify-center overflow-hidden"
              style={{
                aspectRatio: aspectRatio === "portrait" ? "3/4" : "1/1",
              }}
            >
              {imageUrl ? (
                <CldImage
                  src={product.cloudinaryPublicId || "/placeholder.svg"}
                  alt={productName}
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
            </div>

            <button
              className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Add to wishlist"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart size={18} className="text-[#942972]" />
            </button>

            {product.discount && (
              <div className="absolute top-2 left-2 bg-[#f06292] text-white text-xs font-bold px-2 py-1 rounded">
                {product.discount}% OFF
              </div>
            )}

            {product.isBestSeller && (
              <div className="absolute top-2 left-2 bg-[#942972] text-white text-xs font-bold px-2 py-1 rounded">
                Best Seller
              </div>
            )}

            {product.Sold && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-bold text-lg">SOLD</span>
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="text-sm font-medium text-[#414141] mb-1 truncate">{productName}</h3>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#942972]">₹{product.price}</span>
              {originalPrice && <span className="text-sm text-gray-500 line-through">₹{originalPrice}/-</span>}
            </div>
          </div>
        </div>
      </DrawerTrigger>

      <DrawerContent className="max-h-[90vh] overflow-y-auto">
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle className="text-xl text-[#942972]">{productName}</DrawerTitle>
            <DrawerDescription className="text-[#414141BF]">
              {isArtwork && "Original Artwork"}
              {isJewelry && "Handcrafted Jewelry"}
              {isDecoration && "Home Decoration"}
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 py-2">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Product image */}
              <div className="md:w-1/2">
                <div className="rounded-lg aspect-square flex items-center justify-center overflow-hidden">
                  {imageUrl ? (
                    <CldImage
                      src={product.cloudinaryPublicId || "/placeholder.svg"}
                      alt={productName}
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
                </div>
              </div>

              {/* Product details */}
              <div className="md:w-1/2">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#414141]">{productName}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xl font-bold text-[#942972]">₹{product.price}</span>
                      {originalPrice && <span className="text-sm text-gray-500 line-through">₹{originalPrice}/-</span>}
                    </div>
                  </div>

                  {product.isBestSeller && <Badge className="bg-[#942972]">Best Seller</Badge>}
                </div>

                {/* Specifications */}
                <div className="space-y-4 mb-6">
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

                {/* Action buttons */}
                <div className="space-y-3">
                  {!product.Sold ? (
                    <>
                      <Button className="w-full bg-[#942972] hover:bg-[#7b1d5e] text-white">Add to Cart</Button>
                      <Button variant="outline" className="w-full border-[#942972] text-[#942972] hover:bg-[#f8e8f3]">
                        Buy Now
                      </Button>
                    </>
                  ) : (
                    <Button disabled className="w-full">
                      Sold Out
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
