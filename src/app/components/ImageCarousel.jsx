import React from 'react'
import {
    Carousel,
    CarouselContent,
  } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image";
import { CldImage } from 'next-cloudinary';


const bruh = [
  "1_qkd7bo",
  "2_hejkhh",
  "3_svid0b",
  "4_w1tcmr",
  "5_yvwjpt",
  "43_x1uhw4",
  "45_aqswwe",
  "49_ddb9m2",
  "51_noyxs9",
  "53_gkcivh"
] ;

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
                {bruh.map((src_public_id)=>{
                  return(
                    <CldImage
                        key={src_public_id}
                        className="m-2 p-2"
                        src={src_public_id}
                        width={200}
                        height={200}
                        alt={`Carousel ${src_public_id}`}
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