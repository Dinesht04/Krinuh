"use client"

import { useState } from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { useCart } from "@/Context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingCart } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"
import { bestSellersData } from "@/v2/sampleData"
import { ProductCard } from "@/components/product-card"
import { CldImage } from "next-cloudinary"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  // Calculate cart summary
  const subtotal = getCartTotal()
  const shipping = subtotal > 0 ? (subtotal > 5000 ? 0 : 250) : 0
  const discount = 0 // Will be calculated based on coupon code
  const total = subtotal + shipping - discount

  // Format price as Indian Rupees
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`
  }

  // Handle coupon code application
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return

    setIsApplyingCoupon(true)
    // Simulate API call to validate coupon
    setTimeout(() => {
      setIsApplyingCoupon(false)
      // For demo purposes, we'll just show an alert
      alert(`Coupon code "${couponCode}" applied!`)
    }, 1000)
  }

  // Get image URL for cart item
  const getImageUrl = (item: any) => {
    if (item.cloudinaryPublicId) {
      return `https://res.cloudinary.com/duscymcfc/image/upload/v1/paintings/${item.cloudinaryPublicId}`
    }
    return item.image || null
  }

  return (
    <main className="min-h-screen bg-gray-50">
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
              <BreadcrumbLink href="/cart" className="text-[#942972]">
                Shopping Cart
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl md:text-3xl font-bold text-[#414141] mb-6">Your Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50">
                  <div className="col-span-6 font-medium text-[#414141]">Product</div>
                  <div className="col-span-2 font-medium text-[#414141] text-center">Price</div>
                  <div className="col-span-2 font-medium text-[#414141] text-center">Quantity</div>
                  <div className="col-span-2 font-medium text-[#414141] text-right">Total</div>
                </div>

                {cartItems.map((item) => {
                  const itemPrice = Number.parseInt(item.price.replace(/[^0-9]/g, ""))
                  const itemTotal = itemPrice * item.quantity
                  const imageUrl = getImageUrl(item)
                  const productName = item.title || item.name || "Product"

                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-100 items-center"
                    >
                      {/* Mobile: Product info with image, name, price */}
                      <div className="md:hidden flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                            {imageUrl ? (
                              <CldImage
                                src={item.cloudinaryPublicId || "/placeholder.svg"}
                                alt={productName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-[#f8e8f3] flex items-center justify-center">
                                <span className="text-[#942972] text-opacity-20 text-lg">
                                  {productName.substring(0, 2).toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-[#414141]">{productName}</h3>
                            <p className="text-sm text-[#414141BF]">
                              {item.category} {item.size && `- ${item.size}`}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Desktop: Product column */}
                      <div className="hidden md:flex md:col-span-6 items-center space-x-4">
                        <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                          {imageUrl ? (
                            <CldImage
                              src={item.cloudinaryPublicId || "/placeholder.svg"}
                              alt={productName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#f8e8f3] flex items-center justify-center">
                              <span className="text-[#942972] text-opacity-20 text-lg">
                                {productName.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-[#414141]">{productName}</h3>
                          <p className="text-sm text-[#414141BF]">
                            {item.category} {item.size && `- ${item.size}`}
                          </p>
                        </div>
                      </div>

                      {/* Mobile: Price and quantity in a row */}
                      <div className="md:hidden flex items-center justify-between mt-4">
                        <div>
                          <p className="text-sm text-[#414141BF]">Price:</p>
                          <p className="font-medium text-[#414141]">{formatPrice(itemPrice)}</p>
                        </div>

                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-[#414141] hover:text-[#942972]"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-2 py-1 min-w-[40px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-[#414141] hover:text-[#942972]"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Desktop: Price column */}
                      <div className="hidden md:block md:col-span-2 text-center">
                        <span className="font-medium text-[#414141]">{formatPrice(itemPrice)}</span>
                      </div>

                      {/* Desktop: Quantity column */}
                      <div className="hidden md:flex md:col-span-2 items-center justify-center">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-[#414141] hover:text-[#942972]"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-2 py-1 min-w-[40px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-[#414141] hover:text-[#942972]"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Mobile: Total and remove button */}
                      <div className="md:hidden flex items-center justify-between mt-2">
                        <div>
                          <p className="text-sm text-[#414141BF]">Total:</p>
                          <p className="font-medium text-[#942972]">{formatPrice(itemTotal)}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 hidden"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Desktop: Total column */}
                      <div className="hidden md:flex md:col-span-2 items-center justify-between">
                        <span className="font-medium text-[#942972]">{formatPrice(itemTotal)}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  )
                })}

                {/* Cart actions */}
                <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <Link href="/">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <ArrowLeft size={16} className="mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-red-500 text-red-500 hover:bg-red-50"
                    onClick={clearCart}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-xl font-semibold text-[#414141] mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[#414141BF]">Subtotal</span>
                    <span className="font-medium text-[#414141]">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#414141BF]">Shipping</span>
                    <span className="font-medium text-[#414141]">
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[#414141BF]">Discount</span>
                      <span className="font-medium text-green-600">-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#414141]">Total</span>
                      <span className="font-bold text-[#942972]">{formatPrice(total)}</span>
                    </div>
                    <div className="text-xs text-[#414141BF] mt-1">
                      Including {formatPrice(subtotal * 0.18)} in taxes
                    </div>
                  </div>
                </div>

                {/* Coupon code */}
                <div className="mb-6">
                  <label htmlFor="coupon" className="block text-sm font-medium text-[#414141] mb-2">
                    Apply Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="coupon"
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      disabled={!couponCode.trim() || isApplyingCoupon}
                      className="bg-[#942972] hover:bg-[#7b1d5e]"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Checkout button */}
                <Button className="w-full bg-[#942972] hover:bg-[#7b1d5e] py-6 text-lg">Proceed to Checkout</Button>

                {/* Shipping note */}
                <div className="mt-4 text-sm text-[#414141BF] text-center">
                  {subtotal >= 5000 ? (
                    <p className="text-green-600">You`&apos;`ve qualified for free shipping! 🎉</p>
                  ) : (
                    <p>Add items worth {formatPrice(5000 - subtotal)} more for free shipping</p>
                  )}
                </div>

                {/* Payment methods */}
                <div className="mt-6 border-t pt-4">
                  <p className="text-sm text-[#414141BF] mb-2">We Accept:</p>
                  <div className="flex gap-2 justify-center">
                    <div className="bg-gray-100 rounded p-1 w-12 h-8 flex items-center justify-center">
                      <span className="text-xs font-medium">Visa</span>
                    </div>
                    <div className="bg-gray-100 rounded p-1 w-12 h-8 flex items-center justify-center">
                      <span className="text-xs font-medium">MC</span>
                    </div>
                    <div className="bg-gray-100 rounded p-1 w-12 h-8 flex items-center justify-center">
                      <span className="text-xs font-medium">PayPal</span>
                    </div>
                    <div className="bg-gray-100 rounded p-1 w-12 h-8 flex items-center justify-center">
                      <span className="text-xs font-medium">UPI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Empty cart state
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-[#f8e8f3] flex items-center justify-center">
                <ShoppingCart size={32} className="text-[#942972]" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-[#414141] mb-2">Your cart is empty</h2>
            <p className="text-[#414141BF] mb-6 max-w-md mx-auto">
              Looks like you haven`&apos;`t added anything to your cart yet. Explore our collections and discover unique
              handcrafted items.
            </p>
            <Link href="/">
              <Button className="bg-[#942972] hover:bg-[#7b1d5e]">Start Shopping</Button>
            </Link>

            {/* Recommended products */}
            <div className="mt-12">
              <h3 className="text-lg font-medium text-[#414141] mb-6">You might like these</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {bestSellersData.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </main>
  )
}
