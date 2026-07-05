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
import { WHATSAPP_NUMBER } from "@/lib/whatsapp"

// EmailJS config (public identifiers — safe to expose to the browser).
const EMAILJS_SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE || "service_2uaoxt5"
const EMAILJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE || "template_iguyl89"
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "WA_Wbe3R2R6QleO9U"

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
      const orderItems = cartItems.map((item) => ({
        productId: String(item.id),
        title: item.title || item.name,
        price: item.price,
        quantity: item.quantity,
      }))

      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API+"/order/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          address,
          city,
          state,
          pincode,
          notes,
          items: orderItems,
          shipping,
          totalAmount: finalTotal,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save order")
      }

      const orderResult = await response.json()
      const orderId = orderResult?.data?._id ?? ""

      try {
        await emailjs.sendForm(
          EMAILJS_SERVICE,
          EMAILJS_TEMPLATE,
          formRef.current,
          { publicKey: EMAILJS_PUBLIC_KEY }
        )
      } catch (emailError) {
        console.error("Order email sending failed:", emailError)
      }

      toast.success("Order placed successfully! We will get in contact with you soon through WhatsApp ❤️")

      // Redirect the customer to WhatsApp pre-filled with their order details.
      const itemsSummary = orderItems
        .map((item) => `- ${item.title} × ${item.quantity}`)
        .join("\n")
      const whatsappMessage =
        `hi my name is ${firstName} ${lastName}, I've placed an order.\n\n` +
        `${itemsSummary}\n\n` +
        `Total cost: ${formatPrice(finalTotal)}\n` +
        `Order ID: ${orderId}`
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`

      clearCart()
      onClose()

      // Open in a new tab so the storefront stays put behind the chat.
      window.open(whatsappUrl, "_blank", "noopener,noreferrer")
    } catch (error) {
      console.error("Order placement failed:", error)
      toast.error("Failed to place order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-krinuh-primary">Complete Your Order</DialogTitle>
        </DialogHeader>

        {/* Order Summary */}
        <div className="bg-krinuh-light rounded-none p-4 mb-6">
          <h3 className="font-medium text-krinuh-text mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            {cartItems.map((item) => {
              const itemPrice = Number.parseInt(item.price.replace(/[^0-9]/g, ""))
              return (
                <div key={item.id} className="flex justify-between">
                  <span className="text-krinuh-text/75">
                    {item.title || item.name} × {item.quantity}
                  </span>
                  <span className="text-krinuh-text">{formatPrice(itemPrice * item.quantity)}</span>
                </div>
              )
            })}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-krinuh-text/75">Subtotal:</span>
                <span className="text-krinuh-text">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-krinuh-text/75">Shipping:</span>
                <span className="text-krinuh-text">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-medium text-krinuh-primary">
                <span>Total:</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-krinuh-text">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
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
                  placeholder="Last Name"
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
                placeholder="Your Email Address"
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
            <h3 className="font-medium text-krinuh-text">Shipping Address</h3>
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
            <Label htmlFor="terms" className="text-sm text-krinuh-text/75">
              I agree to the terms and conditions and privacy policy
            </Label>
          </div>

          {/* Hidden fields for EmailJS */}
          <input type="hidden" name="orderType" value="purchase" />
          <input type="hidden" name="totalAmount" value={finalTotal} />
          <input type="hidden" name="itemCount" value={cartItems.length} />
          <input type="hidden" name="orderItems" value={JSON.stringify(cartItems)} />

          <Button type="submit" className="w-full bg-krinuh-primary hover:bg-krinuh-primaryDark rounded-none py-6 text-lg" disabled={isSubmitting}>
            {isSubmitting ? "Placing Order..." : `Place Order - ${formatPrice(finalTotal)}`}
          </Button>
        </form>

        <div className="mt-4 text-sm text-krinuh-text/75 text-center flex lg:justify-center lg:items-center lg:space-x-4">
                    
                  <div> We use WhatsApp
                  for order updates and further communications.
                  </div>
                  <div><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 40 40">
<path fill="#f2faff" d="M4.221,29.298l-0.104-0.181c-1.608-2.786-2.459-5.969-2.458-9.205 C1.663,9.76,9.926,1.5,20.078,1.5c4.926,0.002,9.553,1.919,13.03,5.399c3.477,3.48,5.392,8.107,5.392,13.028 c-0.005,10.153-8.268,18.414-18.42,18.414c-3.082-0.002-6.126-0.776-8.811-2.24l-0.174-0.096l-9.385,2.46L4.221,29.298z"></path><path fill="#788b9c" d="M20.078,2L20.078,2c4.791,0.001,9.293,1.867,12.676,5.253C36.137,10.639,38,15.14,38,19.927 c-0.005,9.878-8.043,17.914-17.927,17.914c-2.991-0.001-5.952-0.755-8.564-2.18l-0.349-0.19l-0.384,0.101l-8.354,2.19 l2.226-8.131l0.11-0.403L4.55,28.867c-1.566-2.711-2.393-5.808-2.391-8.955C2.163,10.036,10.202,2,20.078,2 M20.078,1 C9.651,1,1.163,9.485,1.158,19.912c-0.002,3.333,0.869,6.588,2.525,9.455L1,39.169l10.03-2.63c2.763,1.507,5.875,2.3,9.042,2.302 h0.008c10.427,0,18.915-8.485,18.92-18.914c0-5.054-1.966-9.807-5.538-13.382C29.89,2.971,25.14,1.002,20.078,1L20.078,1z"></path><path fill="#79ba7e" d="M19.995,35c-2.504-0.001-4.982-0.632-7.166-1.823l-1.433-0.782l-1.579,0.414l-3.241,0.85l0.83-3.03	l0.453-1.656L7,27.485c-1.309-2.267-2.001-4.858-2-7.492C5.004,11.726,11.732,5.001,19.998,5c4.011,0.001,7.779,1.563,10.61,4.397	C33.441,12.231,35,15.999,35,20.005C34.996,28.273,28.268,35,19.995,35z"></path><path fill="#fff" d="M28.28,23.688c-0.45-0.224-2.66-1.313-3.071-1.462c-0.413-0.151-0.712-0.224-1.012,0.224	c-0.3,0.45-1.161,1.462-1.423,1.761c-0.262,0.3-0.524,0.337-0.974,0.113c-0.45-0.224-1.899-0.7-3.615-2.231	c-1.337-1.191-2.239-2.663-2.501-3.113c-0.262-0.45-0.029-0.693,0.197-0.917c0.202-0.202,0.45-0.525,0.674-0.787	c0.224-0.262,0.3-0.45,0.45-0.75c0.151-0.3,0.075-0.563-0.038-0.787c-0.113-0.224-1.012-2.437-1.387-3.336	c-0.364-0.876-0.736-0.757-1.012-0.771c-0.262-0.014-0.562-0.015-0.861-0.015c-0.3,0-0.787,0.113-1.198,0.563	c-0.411,0.45-1.573,1.537-1.573,3.749s1.611,4.35,1.835,4.649c0.224,0.3,3.169,4.839,7.68,6.786	c1.072,0.462,1.911,0.739,2.562,0.947c1.076,0.342,2.057,0.294,2.832,0.178c0.864-0.129,2.66-1.087,3.034-2.136	c0.375-1.049,0.375-1.95,0.262-2.136C29.03,24.025,28.731,23.912,28.28,23.688z"></path>
</svg> </div>   
                </div>
      </DialogContent>
    </Dialog>
  )
}
