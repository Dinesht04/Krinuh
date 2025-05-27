"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Palette, Gem, Home, MessageSquare } from "lucide-react"
import { EnquiryForm } from "@/components/enquiry-form"

export function CustomWorkSection() {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)
  const [enquiryCategory, setEnquiryCategory] = useState<"paintings" | "jewelry" | "decorations">("paintings")

  const handleCustomEnquiry = (category: "paintings" | "jewelry" | "decorations") => {
    setEnquiryCategory(category)
    setShowEnquiryForm(true)
  }

  return (
    <>
      <div className="py-16 bg-[#f8f8f8]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#414141] mb-3">Custom & Bespoke Creations</h2>
            <p className="text-[#414141BF] max-w-2xl mx-auto">
              Can't find exactly what you're looking for? I create custom paintings, jewelry, and decorative pieces
              tailored to your specific preferences and requirements.
            </p>
          </div>

          {/* Process steps - mobile: vertical, desktop: horizontal */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#f8e8f3] rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="text-[#942972]" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-[#414141] mb-2">1. Consultation</h3>
              <p className="text-sm text-[#414141BF]">
                Share your vision, preferences, and requirements through a detailed consultation.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#f8e8f3] rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="text-[#942972]" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-[#414141] mb-2">2. Design</h3>
              <p className="text-sm text-[#414141BF]">
                I'll create sketches or design concepts for your approval before starting the creation process.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#f8e8f3] rounded-full flex items-center justify-center mx-auto mb-4">
                <Gem className="text-[#942972]" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-[#414141] mb-2">3. Creation</h3>
              <p className="text-sm text-[#414141BF]">
                Your piece is handcrafted with care and attention to detail, ensuring the highest quality.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#f8e8f3] rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="text-[#942972]" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-[#414141] mb-2">4. Delivery</h3>
              <p className="text-sm text-[#414141BF]">
                Your custom creation is carefully packaged and delivered to your doorstep.
              </p>
            </div>
          </div>

          {/* Custom categories - mobile: stacked, desktop: side by side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-[#f8e8f3] flex items-center justify-center">
                <div className="text-[#942972] text-opacity-20 text-6xl font-light">PA</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#414141] mb-2">Custom Paintings</h3>
                <p className="text-[#414141BF] mb-4">
                  Commission a unique painting for your space. From landscapes to abstracts, I can create artwork that
                  perfectly complements your interior.
                </p>
                <ul className="text-sm text-[#414141BF] mb-4 space-y-1">
                  <li>• Custom sizes and color schemes</li>
                  <li>• Various styles and techniques</li>
                  <li>• Perfect for gifts or personal spaces</li>
                </ul>
                <Button
                  className="w-full bg-[#942972] hover:bg-[#7b1d5e]"
                  onClick={() => handleCustomEnquiry("paintings")}
                >
                  Request a Painting
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-[#f8e8f3] flex items-center justify-center">
                <div className="text-[#942972] text-opacity-20 text-6xl font-light">JE</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#414141] mb-2">Custom Jewelry</h3>
                <p className="text-[#414141BF] mb-4">
                  Design personalized jewelry pieces that tell your story. From engagement rings to family heirlooms,
                  create something truly special.
                </p>
                <ul className="text-sm text-[#414141BF] mb-4 space-y-1">
                  <li>• Choice of materials and gemstones</li>
                  <li>• Personalized engravings</li>
                  <li>• Perfect for special occasions</li>
                </ul>
                <Button
                  className="w-full bg-[#942972] hover:bg-[#7b1d5e]"
                  onClick={() => handleCustomEnquiry("jewelry")}
                >
                  Design Your Jewelry
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-[#f8e8f3] flex items-center justify-center">
                <div className="text-[#942972] text-opacity-20 text-6xl font-light">DE</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#414141] mb-2">Custom Decorations</h3>
                <p className="text-[#414141BF] mb-4">
                  Transform your space with bespoke decorative pieces that reflect your personality and style. From wall
                  art to table centerpieces.
                </p>
                <ul className="text-sm text-[#414141BF] mb-4 space-y-1">
                  <li>• Tailored to your interior design</li>
                  <li>• Unique conversation pieces</li>
                  <li>• Functional and beautiful</li>
                </ul>
                <Button
                  className="w-full bg-[#942972] hover:bg-[#7b1d5e]"
                  onClick={() => handleCustomEnquiry("decorations")}
                >
                  Order Custom Decor
                </Button>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-[#414141] mb-3">Ready to create something unique?</h3>
            <p className="text-[#414141BF] mb-6 max-w-2xl mx-auto">
              Let's collaborate on a one-of-a-kind piece that perfectly suits your needs and preferences. We prefer
              WhatsApp ❤️ for quick communication!
            </p>
            <Button
              size="lg"
              className="bg-[#942972] hover:bg-[#7b1d5e] px-8"
              onClick={() => handleCustomEnquiry("paintings")}
            >
              Start Your Custom Order
            </Button>
          </div>
        </div>
      </div>

      {/* Enquiry Form */}
      <EnquiryForm
        isOpen={showEnquiryForm}
        onClose={() => setShowEnquiryForm(false)}
        enquiryType="custom"
        category={enquiryCategory}
      />
    </>
  )
}
