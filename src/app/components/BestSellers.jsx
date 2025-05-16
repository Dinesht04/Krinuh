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

const BestSellers = () => {
  const products = [
    {
      title: "Mini Rang (Earrings & Mathapatti)",
      image: "/images/mini-rang.jpg",
      price: 2999,
      oldPrice: 3999,
      discount: "25% off",
      label: "Best Seller",
    },
    {
      title: "Gul Sitara Earchains",
      image: "/images/gul-sitara.jpg",
      price: 2999,
      label: "Best Seller",
    },
    {
        title: "Mini Rang (Earrings & Mathapatti)",
        image: "/images/mini-rang.jpg",
        price: 2999,
        oldPrice: 3999,
        discount: "25% off",
        label: "Best Seller",
      },
      {
        title: "Gul Sitara Earchains",
        image: "/images/gul-sitara.jpg",
        price: 2999,
        label: "Best Seller",
      },
    // Add more products if needed
  ]

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold text-center mb-4">BEST SELLERS</h2>

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
                  {product.discount && (
                    <span className="absolute top-2 right-2 bg-[#f36f4a] text-white text-xs font-bold px-2 py-0.5 ">
                      {product.discount}
                    </span>
                  )}

                  <Heart className="absolute bottom-2 left-2 text-white bg-black/60 p-1 rounded-full w-6 h-6" />
                </div>

                <CardContent className="p-3">
                  <p className="text-sm font-medium">{product.title}</p>
                  <div className="mt-1 flex gap-2 items-center">
                    <p className="font-semibold text-base">₹ {product.price.toLocaleString()}</p>
                    {product.oldPrice && (
                      <p className="text-gray-500 line-through text-sm">₹ {product.oldPrice.toLocaleString()}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="absolute right-2 top-[40%] -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md" />
      </Carousel>

      <div className="mt-6 flex justify-center">
        <Button className="bg-[#dfcce3] hover:bg-[#2d2d2d] text-black px-6 py-2 rounded-none">
          VIEW ALL
        </Button>
      </div>
    </div>
  )
}

export default BestSellers
