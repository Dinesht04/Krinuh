"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ProductCard, type Product } from "@/components/product-card"
import Link from "next/link"

interface ProductCarouselProps {
  title: string
  products: Product[]
  className?: string
  viewAllLink?: string
}

export function ProductCarousel({ title, products, className, viewAllLink }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const visibleProducts = isMobile ? 1 : Math.min(4, products.length)
  const maxIndex = products.length - visibleProducts

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const handleTouchScroll = (e: React.TouchEvent) => {
    const container = containerRef.current
    if (!container) return

    const touchStart = e.touches[0].clientX
    let touchEnd = touchStart

    const handleTouchMove = (e: TouchEvent) => {
      touchEnd = e.touches[0].clientX
    }

    const handleTouchEnd = () => {
      const diff = touchStart - touchEnd
      if (diff > 50) {
        handleNext()
      } else if (diff < -50) {
        handlePrev()
      }

      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }

    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchend", handleTouchEnd)
  }

  return (
    <div className={cn("py-8", className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-[#414141]">{title}</h2>

        <div className="relative">
          <div ref={containerRef} className="overflow-hidden" onTouchStart={handleTouchScroll}>
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleProducts)}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className={`flex-shrink-0 w-full md:w-1/${visibleProducts} px-2`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 text-[#942972] hidden md:block"
              aria-label="Previous products"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {currentIndex < maxIndex && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 text-[#942972] hidden md:block"
              aria-label="Next products"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        <div className="flex justify-center mt-4 gap-1">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index ? "w-6 bg-[#942972]" : "w-2 bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-6">
          {viewAllLink ? (
            <Link href={viewAllLink}>
              <Button variant="outline" className="border-[#942972] text-[#942972] hover:bg-[#f8e8f3]">
                View All
              </Button>
            </Link>
          ) : (
            <Button variant="outline" className="border-[#942972] text-[#942972] hover:bg-[#f8e8f3]">
              View All
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
