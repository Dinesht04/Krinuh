"use client"
import React from 'react'
import { Carousel, CarouselContent, CarouselItem,CarouselNext,CarouselPrevious } from './ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

const TonotoOfferCarousel = () => {

    const commonClasses = "flex justify-center items-center py-2 h-[50px] text-[#121212] text-[12px]";

  return (
    <div className='bg-[#f4f1ed]  '>
        <Carousel
        opts={{
            loop:true
        }}
         plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}>
            <CarouselContent>
                <CarouselItem> <div className={commonClasses}> 100k Celebration is Live  🎉</div></CarouselItem>
                <CarouselItem> <div className={commonClasses}>Free Shipping all over Jaipur!</div></CarouselItem>
                <CarouselItem> <div className={commonClasses}>Handmade & Limited: Shop Now!</div></CarouselItem>
                <CarouselItem> <div className={commonClasses}>New Jewellery Out Now!</div></CarouselItem>
            </CarouselContent>
        </Carousel>
    </div>
  )
}

export default TonotoOfferCarousel