"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useCart } from "@/Context/cart-context"
import { toast } from "sonner"
import emailjs from '@emailjs/browser';

// Validation functions
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const isValidPhone = (phone: string) => /^[0-9]{10}$/.test(phone)
const isValidPincode = (pincode: string) => /^[0-9]{6}$/.test(pincode)

interface CheckoutFormProps {
  isOpen: boolean
  onClose: () => void
}

export function CheckoutForm({ isOpen, onClose }: CheckoutFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { cartItems, getCartTotal, clearCart } = useCart()

  // Form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [pincode, setPincode] = useState("")
  const [notes, setNotes] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const total = getCartTotal()
  const shipping = total > 5000 ? 0 : 250
  const finalTotal = total + shipping

  const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!firstName || !lastName || !email || !phoneNumber || !address || !city || !state || !pincode) {
      toast.error("Please fill all required fields")
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

    if (!isValidPincode(pincode)) {
      toast.error("Please enter a valid 6-digit pincode")
      return
    }

    if (!agreeToTerms) {
      toast.error("Please agree to the terms and conditions")
      return
    }

    setIsSubmitting(true)
    
    try {
      emailjs.sendForm(
        process.env.EMAILJS_SERVICE,
        process.env.EMAILJS_TEMPLATE,
        formRef.current,
        { publicKey: 'WA_Wbe3R2R6QleO9U' }
      )

      toast.success("Order placed successfully! We will get in contact with you soon. We prefer WhatsApp ❤️")
      clearCart()
      
      onClose()
    } catch (error) {
      console.error("Order email sending failed:", error)
      toast.error("Failed to place order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#942972]">Complete Your Order</DialogTitle>
        </DialogHeader>

        {/* Order Summary */}
        <div className="bg-[#f8e8f3] rounded-lg p-4 mb-6">
          <h3 className="font-medium text-[#414141] mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            {cartItems.map((item) => {
              const itemPrice = Number.parseInt(item.price.replace(/[^0-9]/g, ""))
              return (
                <div key={item.id} className="flex justify-between">
                  <span className="text-[#414141BF]">
                    {item.title || item.name} × {item.quantity}
                  </span>
                  <span className="text-[#414141]">{formatPrice(itemPrice * item.quantity)}</span>
                </div>
              )
            })}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-[#414141BF]">Subtotal:</span>
                <span className="text-[#414141]">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#414141BF]">Shipping:</span>
                <span className="text-[#414141]">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-medium text-[#942972]">
                <span>Total:</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-[#414141]">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
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
                <Label htmlFor="lastName">Last Name *</Label>
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
              <Label htmlFor="email">Email Address *</Label>
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
              <Label htmlFor="phoneNumber">Phone Number *</Label>
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
          </div>

          {/* Shipping Address */}
          <div className="space-y-4">
            <h3 className="font-medium text-[#414141]">Shipping Address</h3>
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Street address, apartment, suite, etc."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Mumbai"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  name="state"
                  placeholder="Maharashtra"
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode *</Label>
              <Input
                id="pincode"
                name="pincode"
                placeholder="400001"
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Order Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Order Notes (Optional)</Label>
            <Textarea
              id="notes"
              name="orderNotes"
              placeholder="Special instructions, delivery preferences..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm text-[#414141BF]">
              I agree to the terms and conditions and privacy policy
            </Label>
          </div>

          {/* Hidden fields for EmailJS */}
          <input type="hidden" name="orderType" value="purchase" />
          <input type="hidden" name="totalAmount" value={finalTotal} />
          <input type="hidden" name="itemCount" value={cartItems.length} />
          <input type="hidden" name="orderItems" value={JSON.stringify(cartItems)} />

          <Button type="submit" className="w-full bg-[#942972] hover:bg-[#7b1d5e] py-6 text-lg" disabled={isSubmitting}>
            {isSubmitting ? "Placing Order..." : `Place Order - ${formatPrice(finalTotal)}`}
          </Button>
        </form>

        <div className="text-center text-sm text-[#414141BF] mt-4">
          We prefer WhatsApp ❤️ for order updates and quick communication
        </div>
      </DialogContent>
    </Dialog>
  )
}
