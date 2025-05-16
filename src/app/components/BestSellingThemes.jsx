"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"

const BestSellingThemes = () => {
  const products = [
    {
      title: "Mini Rang Theme",
      image: "/images/mini-rang.jpg",
      price: 2999,
      oldPrice: 3999,
      discount: "25% off",
      label: "Colour Customizable",
    },
    {
      title: "Gul Theme",
      image: "/images/gul-sitara.jpg",
      price: 2999,
      
    },
    {
        title: "Mini Rang Theme",
        image: "/images/mini-rang.jpg",
        price: 2999,
        oldPrice: 3999,
        discount: "25% off",
        label: "Colour Customizable",
      },
      {
        title: "Gul Theme",
        image: "/images/gul-sitara.jpg",
        price: 2999,
        
      },
    // Add more products if needed
  ]

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold text-center mb-4">BEST SELLING THEMES</h2>

      <Carousel 
      opts={{
                  loop:true
              }}
               plugins={[
                  Autoplay({
                    delay: 2000,
                  }),
                ]}
      className="w-full">
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem key={index} className="basis-3/4">
              <Card className="relative border-none shadow-none">
                <div className="relative w-full h-60 overflow-hidden">
                <Image
                    src={'/Decorationthumb.jpg'}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className=""
                    />

                  {product.label && (
                    <span className="absolute top-2 left-2 bg-[#dfcce3] text-xs font-medium text-black px-2 py-0.5 ">
                      {product.label}
                    </span>
                  )}

                  <Heart className="absolute bottom-2 left-2 text-white bg-black/60 p-1 rounded-full w-6 h-6" />
                </div>

                <CardContent className="p-3">
                  <p className="text-sm font-medium">{product.title}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="absolute right-2 top-[40%] -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md" />
      </Carousel>

      <div className="mt-6 flex justify-center">
        <Button className="bg-[#414141] hover:bg-[#2d2d2d] text-white px-6 py-2 rounded-none">
          VIEW ALL
        </Button>
      </div>
    </div>
  )
}

export default BestSellingThemes
