"use client"
import React,{useCallback} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft,ChevronRight } from "lucide-react";

const collections = [
  {
    title: "JHILMIL COLLECTION",
    image: "/holder2thumb.jpg", // Replace with actual path
  },
  {
    title: "PHIRKI COLLECTION",
    image: "/holder2thumb.jpg", // Replace with actual path
  },
];

const carouselItems = [
  { title: "INDIAN HAIR ACCESSORIES", image: "/holder1thumb.jpg" },
  { title: "LATKAN/KALEERAS", image: "/holder1thumb.jpg" },
  { title: "EARCHAINS", image: "/holder1thumb.jpg" },
  { title: "BANGLES", image: "/holder1thumb.jpg" },
  { title: "PAYALS", image: "/holder1thumb.jpg" },
  { title: "RINGS", image: "/holder1thumb.jpg" },
];

const NewIn = () => {
      
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
    
    
  return (
    <section className="px-4 py-10 max-w-screen-md mx-auto">
      <h2 className="text-center text-xl font-semibold mb-6">NEW IN</h2>

      {/* Top Collection Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {collections.map((item) => (
          <div key={item.title} className="relative overflow-hidden shadow-md">
            <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4 text-white">
              <p className="font-bold text-sm mb-2">{item.title}</p>
              <button
                className="bg-[#f4f1ed] text-black text-sm px-4 py-1 shadow-md w-fit"
              >
                SHOP NOW
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Section */}
      <div className="overflow-x-auto w-fit" ref={emblaRef}>
        
        
        <div className="flex space-x-4 w-fit">
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className="min-w-[40%] max-w-[40%] flex-shrink-0 relative overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-end p-3 text-white text-xs font-medium">
                {item.title}
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-2  -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      

      </div>
    </section>
  );
};

export default NewIn;
