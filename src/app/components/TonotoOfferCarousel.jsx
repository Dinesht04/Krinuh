"use client"
import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

const offers = [
  "A memory — hand-painted on canvas in 3 weeks",
  "Original art, hand-painted in Jaipur",
  "Handmade & one-of-a-kind — never a print",
  "Free shipping all over Jaipur",
]

const TonotoOfferCarousel = () => {
  return (
    <div className="bg-krinuh-light border-b border-krinuh-secondaryBorder">
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 4000 })]}
      >
        <CarouselContent>
          {offers.map((offer, i) => (
            <CarouselItem key={i}>
              <div className="flex justify-center items-center gap-3 h-[40px] text-krinuh-primary text-[11px] uppercase tracking-[0.22em] font-medium">
                <span className="text-krinuh-primary/40 text-[9px]">✦</span>
                <span className="text-center px-4">{offer}</span>
                <span className="text-krinuh-primary/40 text-[9px]">✦</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default TonotoOfferCarousel
