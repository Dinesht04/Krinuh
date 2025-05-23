"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Slide {
  id: number
  image: string
  title: string
  subtitle: string
  cta: string
  link: string
  backgroundColor: string
}

interface HeroCarouselProps {
  slides: Slide[]
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out h-[300px] md:h-[400px] lg:h-[500px]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="flex-shrink-0 w-full relative"
            style={{ backgroundColor: slide.backgroundColor }}
          >
            <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left md:w-1/2 py-8 md:py-0">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#414141] mb-4">{slide.title}</h1>
                <p className="text-lg md:text-xl text-[#414141BF] mb-6">{slide.subtitle}</p>
                <Button className="bg-[#942972] hover:bg-[#7b1d5e] text-white px-6 py-2 text-lg">{slide.cta}</Button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  className="max-h-[250px] md:max-h-[350px] object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md z-10 text-[#942972] hidden md:block"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md z-10 text-[#942972] hidden md:block"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index ? "w-8 bg-[#942972]" : "w-2 bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
