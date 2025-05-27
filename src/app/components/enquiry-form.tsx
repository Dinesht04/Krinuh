"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Product } from "@/components/product-card"
import { toast } from "sonner"

// Validation functions
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const isValidPhone = (phone: string) => /^[0-9]{10}$/.test(phone)

interface EnquiryFormProps {
  isOpen: boolean
  onClose: () => void
  product?: Product
  enquiryType: "custom" | "product"
  category?: "paintings" | "jewelry" | "decorations"
}

export function EnquiryForm({ isOpen, onClose, product, enquiryType, category }: EnquiryFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")

  // Get product details
  const productName = product?.title || product?.name || ""
  const productPrice = product?.price || ""
  const productSize = product?.size || product?.dimensions || ""

  // Get image URL
  const getImageUrl = () => {
    if (product?.cloudinaryPublicId) {
      return `https://res.cloudinary.com/duscymcfc/image/upload/v1/paintings/${product.cloudinaryPublicId}`
    }
    return product?.image || null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!firstName || !lastName || !email || !message || !phoneNumber) {
      toast.error("Please fill all the fields")
      return
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address")
      return
    }

    if (!isValidPhone(phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate EmailJS call (replace with actual EmailJS implementation)
      // emailjs.sendForm(
      //   'service_2uaoxt5',
      //   'template_iguyl89',
      //   formRef.current,
      //   { publicKey: 'WA_Wbe3R2R6QleO9U' }
      // )

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Email sent successfully!")

      toast.success(
        enquiryType === "custom"
          ? "Custom enquiry placed! We will get in contact with you soon. We prefer WhatsApp ❤️"
          : "Product enquiry sent! We will get in contact with you soon. We prefer WhatsApp ❤️",
      )

      // Reset form
      setFirstName("")
      setLastName("")
      setEmail("")
      setPhoneNumber("")
      setMessage("")

      onClose()
    } catch (error) {
      console.error("Email sending failed:", error)
      toast.error("Failed to send enquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getTitle = () => {
    if (enquiryType === "custom") {
      return `Custom ${category?.charAt(0).toUpperCase()}${category?.slice(1)} Enquiry`
    }
    return `Product Enquiry - ${productName}`
  }

  const getPlaceholderMessage = () => {
    if (enquiryType === "custom") {
      switch (category) {
        case "paintings":
          return "Wall size, color preference, style, subject matter..."
        case "jewelry":
          return "Material preference, gemstones, size, occasion..."
        case "decorations":
          return "Room type, color scheme, size requirements..."
        default:
          return "Please describe your requirements..."
      }
    }
    return "Questions about this product, customization requests..."
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#942972]">{getTitle()}</DialogTitle>
        </DialogHeader>

        {/* Product preview for product enquiries */}
        {enquiryType === "product" && product && (
          <div className="flex items-center space-x-4 p-4 bg-[#f8e8f3] rounded-lg mb-4">
            <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
              {getImageUrl() ? (
                <img
                  src={getImageUrl() || "/placeholder.svg"}
                  alt={productName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#e8d5eb] flex items-center justify-center">
                  <span className="text-[#942972] text-opacity-50 text-sm">
                    {productName.substring(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-[#414141] text-sm">{productName}</h3>
              {productSize && (
                <div className="flex items-center mt-1">
                  <span className="bg-gray-200 px-2 py-1 rounded text-xs font-medium">Size</span>
                  <span className="ml-2 text-xs text-[#414141BF]">{productSize}</span>
                </div>
              )}
              {productPrice && (
                <div className="flex items-center mt-1">
                  <span className="bg-green-200 px-2 py-1 rounded text-xs font-medium">Price</span>
                  <span className="ml-2 text-xs text-[#414141BF]">₹{productPrice}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Jane"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="Email"
              placeholder="jane@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="10-digit number"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="Message"
              placeholder={getPlaceholderMessage()}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
            />
          </div>

          {/* Hidden fields for EmailJS */}
          <input type="hidden" name="enquiryType" value={enquiryType} />
          <input type="hidden" name="category" value={category || ""} />
          {product && (
            <>
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="productName" value={productName} />
              <input type="hidden" name="productPrice" value={productPrice} />
              <input type="hidden" name="productSize" value={productSize} />
            </>
          )}

          <Button type="submit" className="w-full bg-[#942972] hover:bg-[#7b1d5e]" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Enquiry →"}
          </Button>
        </form>

        <div className="text-center text-sm text-[#414141BF] mt-4">We prefer WhatsApp ❤️ for quick responses</div>
      </DialogContent>
    </Dialog>
  )
}
