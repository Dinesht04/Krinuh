"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const reviews = [
  {
    name: "Deeksha Tripathi",
    role: "Customer",
    image: "/Rangolithumb.JPG", // Replace with your public image path or import
    testimonial:
      "I am absolutely happy with the jewelry I purchased from Krinuh!! The pieces were even more stunning in person and added an elegant touch to my special day.",
  },
  {
    name: "Aanya Sharma",
    role: "Customer",
    image: "/Rangolithumb.JPG",
    testimonial:
      "Krinuh’s handmade jewelry is breathtaking! You can tell every piece is made with love. I can’t wait to order more!",
  },
  {
    name: "Ritika Mehra",
    role: "Customer",
    image: "/Rangolithumb.JPG",
    testimonial:
      "I gifted my sister a necklace from Krinuh and she adored it! It was packaged beautifully and arrived on time.",
  },
];

export default function CustomerReviews() {
  return (
    <section className="py-16 px-6 text-center bg-white">
      <h2 className="text-3xl font-cursive font-semibold mb-10">
        Customer Reviews
      </h2>
      <Carousel className="w-full max-w-xl mx-auto"
        opts={{
                          loop:true
                      }}
                       plugins={[
                          Autoplay({
                            delay: 2000,
                          }),
                        ]}
      >
        <CarouselContent>
          {reviews.map((review, index) => (
            <CarouselItem key={index}>
              <Card className="border-none shadow-none">
                <CardContent className="p-0">
                    <div className="relative w-full h-[400px] overflow-hidden">
                        <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        className="object-cover"
                        />

                        {/* Overlay gradient and content */}
                        <div className="absolute bottom-0 left-0 w-full pt-16 pb-4 px-6 text-white bg-gradient-to-t from-[#7587bf] via-[#7587bfcc] to-transparent">
                        <p className="font-semibold text-lg">{review.name}</p>
                        <p className="text-sm mb-2">({review.role})</p>
                        <div className="flex justify-center mb-2">
                            {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <p className="text-sm leading-relaxed italic">
                            “{review.testimonial}”
                        </p>
                        </div>
                    </div>
                    </CardContent>


              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-4 mt-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </section>
  );
}
