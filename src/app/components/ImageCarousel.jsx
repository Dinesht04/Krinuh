import React from 'react'
import {
    Carousel,
    CarouselContent,
  } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image";


const bruh = [49,43,53, 51, 45,1,2, 52 ,3,4,5];

const ImageCarousel = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 1000, stopOnInteraction: false })
        )
  return (
    <div>
        <Carousel orientation="horizontal" 
                plugins={[plugin.current]}

              >
              <CarouselContent>
                {bruh.map((num)=>{
                  return(
                    <Image
                        key={num}
                        className="m-2 p-2"
                        src={`/${num}.jpg`}
                        width={200}
                        height={200}
                        alt={`Carousel ${num}`}
                        
                quality={100}
                    />
                  )
                })}
              </CarouselContent>
            </Carousel>
    </div>
  )
}

export default ImageCarousel