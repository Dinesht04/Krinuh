"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { CldImage } from "next-cloudinary"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Palette, Sparkles, Eye } from "lucide-react"

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

const featuredPaintings = [
  {
    id: "18",
    title: "Mountain Symphony",
    artist: "Shweta Tyagi",
    price: "₹4,500",
    category: "Seascape",
    description: "This is a beautiful painting depicting a serene mountain scene.",
  },
  {
    id: "43_x1uhw4",
    title: "Where Land Meets Sea",
    artist: "Shweta Tyagi",
    price: "₹5,200",
    category: "Landscape",
    description: "This isa painting of a scenic coastal landscape.",
  },
  {
    id: "52_fbpdi4",
    title: "Snowy Summit",
    artist: "Shweta Tyagi",
    price: "₹6,800",
    category: "Abstract",
    description: "The painting depicts a serene lakeside scene with a majestic mountain.",
  },
  {
    id: "10_vfp4pr",
    title: "Nature's Symphony",
    artist: "Shweta Tyagi",
    price: "₹4,800",
    category: "Nature",
    description: "This painting depicts a beautiful waterfall.",
  },
]

const galleryImages = [
  "2_hejkhh",
  "3_svid0b",
  "4_w1tcmr",
  "5_yvwjpt",
  "7_xagzxx",
  "9_dylewy",
  "11_ilunby",
  "16_bcf0ku",
  "23_hkbuwp",
  "27_kts8sa",
  "31_tjhlxu",
  "37_hxtis3",
  "41_fcih0q",
  "45_aqswwe",
  "49_ddb9m2",
]

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentFeatured, setCurrentFeatured] = useState(0)
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatured((prev) => (prev + 1) % featuredPaintings.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const currentPainting = featuredPaintings[currentFeatured]


  if (!isMobile){
    return(
      <div className="relative min-h-screen bg-gradient-to-br from-[#faf9f7] via-white to-[#f8e8f3] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23942972' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-12 gap-8 min-h-[80vh]">
          {/* Left Content Section */}
          <div className="col-span-5 flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <Badge className="bg-[#942972]/10 text-[#942972] border-[#942972]/20 w-fit">
                <Sparkles className="w-3 h-3 mr-1" />
                Handcrafted Originals
              </Badge>

              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-[#414141] leading-tight">
                  Elevate Your
                  <span className="block text-[#942972]">Living Space</span>
                </h1>
                <p className="text-xl text-[#414141BF] leading-relaxed max-w-lg">
                  Discover unique, handcrafted paintings that transform your home into a gallery of personal expression
                  and artistic beauty.
                </p>
              </div>
            </div>

            {/* Featured Painting Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#942972]/10 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4 text-[#942972]" />
                <span className="text-sm font-medium text-[#942972]">Featured Artwork</span>
              </div>
              <h3 className="text-2xl font-semibold text-[#414141] mb-2">{currentPainting.title}</h3>
              <p className="text-[#414141BF] mb-4">{currentPainting.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-[#942972]">{currentPainting.price}</span>
                  <Badge variant="outline" className="border-[#942972]/30 text-[#942972]">
                    {currentPainting.category}
                  </Badge>
                </div>
                <Link href="/gallery">
                  <Button className="bg-[#942972] hover:bg-[#7b1d5e] text-white group">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <Link href="/gallery">
                <Button size="lg" className="bg-[#942972] hover:bg-[#7b1d5e] text-white px-8">
                  <Palette className="w-5 h-5 mr-2" />
                  Explore Gallery
                </Button>
              </Link>
              <Link href="#custom-work">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#942972] text-[#942972] hover:bg-[#f8e8f3] px-8 bg-transparent"
                >
                  Commission Art
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Visual Section */}
          <div className="col-span-7 relative">
            {/* Main Featured Image */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-[#942972]/10 rounded-3xl" />
              <div className="relative bg-white h-[650px] overflow-hidden rounded-3xl p-4 shadow-2xl">
              <CldImage
                src={currentPainting.id || "/placeholder.svg"}
                alt={currentPainting.title}
                height={500}
                width={500}
                className="w-full  object-cover cursor-pointer"
              />
               

                {/* Floating Price Tag */}
                <div className="absolute -top-2 -right-2 bg-[#942972] text-white px-4 py-2 rounded-full shadow-lg">
                  <span className="font-bold">{currentPainting.price}</span>
                </div>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="absolute -bottom-8 -right-8 grid grid-cols-3 gap-3 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl">
              {galleryImages.slice(0, 6).map((imageId, index) => (
                <div
                  key={imageId}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredImage(imageId)}
                  onMouseLeave={() => setHoveredImage(null)}
                >

                  <CldImage
                src={imageId || "/placeholder.svg"}
                alt={imageId}
                height={64}
                width={64}
                className="w-full h-full object-cover cursor-pointer"
              />
                  
                  {hoveredImage === imageId && (
                    <Link href="/gallery">
                      <div className="absolute inset-0 bg-[#942972]/20 rounded-lg flex items-center justify-center">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </Link>
                    
                  )}
                </div>
              ))}
            </div>

            {/* Floating Stats */}
            <div className="absolute top-8 -left-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#942972]">50+</div>
                <div className="text-sm text-[#414141BF]">Original Pieces</div>
              </div>
            </div>

            <div className="absolute bottom-32 -left-12 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#942972]">100%</div>
                <div className="text-sm text-[#414141BF]">Handcrafted</div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Navigation Dots */}
        <div className="flex justify-center mt-12 space-x-3">
          {featuredPaintings.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentFeatured(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentFeatured === index ? "w-8 bg-[#942972]" : "w-2 bg-[#942972]/30"
              }`}
              aria-label={`View featured painting ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-[#942972]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#f8e8f3]/50 rounded-full blur-3xl" />
    </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out h-[400px] md:h-[400px] lg:h-[500px]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="flex-shrink-0 w-full relative"
            style={{ backgroundColor: slide.backgroundColor }}
          >
            <Link href={slide.link} className="block w-full h-full">
              <CldImage
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                height={300}
                width={300}
                className="w-full h-full object-cover cursor-pointer"
              />
            </Link>
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
