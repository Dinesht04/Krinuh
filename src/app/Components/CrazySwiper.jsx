import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import '../globals.css'


import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

const CrazySwiper = () => {
    
    const opusPaintings = [];
    //change this value to the number of paintings, if more paintings are added in future.
    //also if you add more pictures, start by naming the picture 43.jpg and so on.
    const numberOfPaintings = 42;

    for( let i = 1;i<=numberOfPaintings;i++){
    opusPaintings.push(i);
    }   

    
    
    //effect colourflow
    //autoplay progress
    //auto-height
    //zoom
    //slidable nav for mobile
    return (
      <>
        <div className=''>
         <Swiper
        effect={'coverflow'}
        grabCursor={true}
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={'1'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        pagination={true}
        modules={[EffectCoverflow, Pagination,Autoplay]}
        className="mySwiper"
      >
            {opusPaintings.map((painting)=>{
            return(
              <div key={painting} id={painting} className=""> 
                <SwiperSlide className='mx-auto'>
                <Image 
                 className='mx-auto'
                  src={`/${painting}.jpg`}
                  width={200}
                  height={300}
                  sizes=""
                  style={{ width:'fit-content', height: 'fit-content' }}
                />
                </SwiperSlide>
              </div>
            )
          })}
        </Swiper>
      </div>
      
      </>
    )
  }

  export default CrazySwiper;