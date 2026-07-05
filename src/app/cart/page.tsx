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
import { CheckoutForm } from "@/components/checkout-form"


export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)


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
    <>
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
              <BreadcrumbLink href="/cart" className="text-krinuh-primary">
                Shopping Cart
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl md:text-3xl font-bold text-krinuh-text mb-6">Your Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-none shadow-card-float overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50">
                  <div className="col-span-6 font-medium text-krinuh-text">Product</div>
                  <div className="col-span-2 font-medium text-krinuh-text text-center">Price</div>
                  <div className="col-span-2 font-medium text-krinuh-text text-center">Quantity</div>
                  <div className="col-span-2 font-medium text-krinuh-text text-right">Total</div>
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
                          <div className="w-16 h-16 flex-shrink-0 rounded-none overflow-hidden">
                            {imageUrl ? (
                              <CldImage
                                src={item.cloudinaryPublicId || "/placeholder.svg"}
                                alt={productName}
                                height={500}
                                width={500}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-krinuh-light flex items-center justify-center">
                                <span className="text-krinuh-primary text-opacity-20 text-lg">
                                  {productName.substring(0, 2).toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-krinuh-text">{productName}</h3>
                            <p className="text-sm text-krinuh-text/75">
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
                        <div className="w-16 h-16 flex-shrink-0 rounded-none overflow-hidden">
                          {imageUrl ? (
                            <CldImage
                              src={item.cloudinaryPublicId || "/placeholder.svg"}
                              alt={productName}
                              height={500}
                              width={500}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-krinuh-light flex items-center justify-center">
                              <span className="text-krinuh-primary text-opacity-20 text-lg">
                                {productName.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-krinuh-text">{productName}</h3>
                          <p className="text-sm text-krinuh-text/75">
                            {item.category} {item.size && `- ${item.size}`}
                          </p>
                        </div>
                      </div>

                      {/* Mobile: Price and quantity in a row */}
                      <div className="md:hidden flex items-center justify-between mt-4">
                        <div>
                          <p className="text-sm text-krinuh-text/75">Price:</p>
                          <p className="font-medium text-krinuh-text">{formatPrice(itemPrice)}</p>
                        </div>

                        <div className="flex items-center border rounded-none">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-krinuh-text hover:text-krinuh-primary"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-2 py-1 min-w-[40px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-krinuh-text hover:text-krinuh-primary"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Desktop: Price column */}
                      <div className="hidden md:block md:col-span-2 text-center">
                        <span className="font-medium text-krinuh-text">{formatPrice(itemPrice)}</span>
                      </div>

                      {/* Desktop: Quantity column */}
                      <div className="hidden md:flex md:col-span-2 items-center justify-center">
                        <div className="flex items-center border rounded-none">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-krinuh-text hover:text-krinuh-primary"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-2 py-1 min-w-[40px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-krinuh-text hover:text-krinuh-primary"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Mobile: Total and remove button */}
                      <div className="md:hidden flex items-center justify-between mt-2">
                        <div>
                          <p className="text-sm text-krinuh-text/75">Total:</p>
                          <p className="font-medium text-krinuh-primary">{formatPrice(itemTotal)}</p>
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
                        <span className="font-medium text-krinuh-primary">{formatPrice(itemTotal)}</span>
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
              <div className="bg-white rounded-none shadow-card-float p-6 sticky top-20">
                <h2 className="text-xl font-semibold text-krinuh-text mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-krinuh-text/75">Subtotal</span>
                    <span className="font-medium text-krinuh-text">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-krinuh-text/75">Shipping</span>
                    <span className="font-medium text-krinuh-text">
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-krinuh-text/75">Discount</span>
                      <span className="font-medium text-green-600">-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-krinuh-text">Total</span>
                      <span className="font-bold text-krinuh-primary">{formatPrice(total)}</span>
                    </div>
                    <div className="text-xs text-krinuh-text/75 mt-1">
                      Including {formatPrice(subtotal * 0.18)} in taxes
                    </div>
                  </div>
                </div>

                {/* Coupon code */}
                {/* <div className="mb-6">
                  <label htmlFor="coupon" className="block text-sm font-medium text-krinuh-text mb-2">
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
                      className="bg-white border-2 border-krinuh-primary text-krinuh-primary hover:bg-krinuh-primary hover:text-white transition-colors rounded-none"
                    >
                      Apply
                    </Button>
                  </div>
                </div> */}

                {/* Checkout button */}
                <Button
                    className="w-full bg-white border-2 border-krinuh-primary text-krinuh-primary hover:bg-krinuh-primary hover:text-white transition-colors rounded-none py-6 text-lg"
                    onClick={() => setShowCheckoutForm(true)}
                  >
                    Proceed to Checkout
                  </Button>

                {/* Shipping note */}
                <div className="mt-4 text-sm text-krinuh-text/75 text-center">
                  {subtotal >= 5000 ? (
                    <p className="text-green-600">You&apos;ve qualified for free shipping! 🎉</p>
                  ) : (
                    <p>Add items worth {formatPrice(5000 - subtotal)} more for free shipping</p>
                  )}
                </div>

                {/* WhatsApp note */}
                <div className="mt-4 text-sm text-krinuh-text/75 text-center flex">
                    
                  <div> We use WhatsApp
                  for order updates and further communications.
                  </div>
                  <div><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 40 40">
<path fill="#f2faff" d="M4.221,29.298l-0.104-0.181c-1.608-2.786-2.459-5.969-2.458-9.205 C1.663,9.76,9.926,1.5,20.078,1.5c4.926,0.002,9.553,1.919,13.03,5.399c3.477,3.48,5.392,8.107,5.392,13.028 c-0.005,10.153-8.268,18.414-18.42,18.414c-3.082-0.002-6.126-0.776-8.811-2.24l-0.174-0.096l-9.385,2.46L4.221,29.298z"></path><path fill="#788b9c" d="M20.078,2L20.078,2c4.791,0.001,9.293,1.867,12.676,5.253C36.137,10.639,38,15.14,38,19.927 c-0.005,9.878-8.043,17.914-17.927,17.914c-2.991-0.001-5.952-0.755-8.564-2.18l-0.349-0.19l-0.384,0.101l-8.354,2.19 l2.226-8.131l0.11-0.403L4.55,28.867c-1.566-2.711-2.393-5.808-2.391-8.955C2.163,10.036,10.202,2,20.078,2 M20.078,1 C9.651,1,1.163,9.485,1.158,19.912c-0.002,3.333,0.869,6.588,2.525,9.455L1,39.169l10.03-2.63c2.763,1.507,5.875,2.3,9.042,2.302 h0.008c10.427,0,18.915-8.485,18.92-18.914c0-5.054-1.966-9.807-5.538-13.382C29.89,2.971,25.14,1.002,20.078,1L20.078,1z"></path><path fill="#79ba7e" d="M19.995,35c-2.504-0.001-4.982-0.632-7.166-1.823l-1.433-0.782l-1.579,0.414l-3.241,0.85l0.83-3.03	l0.453-1.656L7,27.485c-1.309-2.267-2.001-4.858-2-7.492C5.004,11.726,11.732,5.001,19.998,5c4.011,0.001,7.779,1.563,10.61,4.397	C33.441,12.231,35,15.999,35,20.005C34.996,28.273,28.268,35,19.995,35z"></path><path fill="#fff" d="M28.28,23.688c-0.45-0.224-2.66-1.313-3.071-1.462c-0.413-0.151-0.712-0.224-1.012,0.224	c-0.3,0.45-1.161,1.462-1.423,1.761c-0.262,0.3-0.524,0.337-0.974,0.113c-0.45-0.224-1.899-0.7-3.615-2.231	c-1.337-1.191-2.239-2.663-2.501-3.113c-0.262-0.45-0.029-0.693,0.197-0.917c0.202-0.202,0.45-0.525,0.674-0.787	c0.224-0.262,0.3-0.45,0.45-0.75c0.151-0.3,0.075-0.563-0.038-0.787c-0.113-0.224-1.012-2.437-1.387-3.336	c-0.364-0.876-0.736-0.757-1.012-0.771c-0.262-0.014-0.562-0.015-0.861-0.015c-0.3,0-0.787,0.113-1.198,0.563	c-0.411,0.45-1.573,1.537-1.573,3.749s1.611,4.35,1.835,4.649c0.224,0.3,3.169,4.839,7.68,6.786	c1.072,0.462,1.911,0.739,2.562,0.947c1.076,0.342,2.057,0.294,2.832,0.178c0.864-0.129,2.66-1.087,3.034-2.136	c0.375-1.049,0.375-1.95,0.262-2.136C29.03,24.025,28.731,23.912,28.28,23.688z"></path>
</svg> </div>   
                </div>

                {/* Payment methods */}
                {/* <div className="mt-6 border-t pt-4">
                  <p className="text-sm text-krinuh-text/75 mb-2">We Accept:</p>
                  <div className="flex gap-2 justify-center">
                    <div className="bg-gray-100 rounded p-1 w-12 h-8 flex items-center justify-center">
                      <span className="text-xs font-medium">UPI</span>
                    </div>
                    <div className="bg-gray-100 rounded p-1 w-12 h-8 flex items-center justify-center">
                      <span className="text-xs font-medium">Credit Card</span>
                    </div>
                    <div className="bg-gray-100 rounded p-1 w-12 h-8 flex items-center justify-center">
                      <span className="text-xs font-medium">Debit Card</span>
                    </div>
                    <div className="bg-gray-100 rounded p-1 w-12 h-8 flex items-center justify-center">
                      <span className="text-xs font-medium">Cash</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        ) : (
          // Empty cart state
          <div className="bg-white rounded-none shadow-card-float p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-krinuh-light flex items-center justify-center">
                <ShoppingCart size={32} className="text-krinuh-primary" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-krinuh-text mb-2">Your cart is empty</h2>
            <p className="text-krinuh-text/75 mb-6 max-w-md mx-auto">
              Looks like you haven&apos;t added anything to your cart yet. Explore our collections and discover unique
              handcrafted items.
            </p>
            <Link href="/">
              <Button className="bg-white border-2 border-krinuh-primary text-krinuh-primary hover:bg-krinuh-primary hover:text-white transition-colors rounded-none">Start Shopping</Button>
            </Link>

            {/* Recommended products */}
            <div className="mt-12">
              <h3 className="text-lg font-medium text-krinuh-text mb-6">You might like these</h3>
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
    
    <CheckoutForm isOpen={showCheckoutForm} onClose={() => setShowCheckoutForm(false)} />

    </>
  )
}
