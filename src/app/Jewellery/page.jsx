import ShopByCategories from '@/components/ShopByCategories'
import TonotoHeroCarousel from '@/components/TonotoHeroCarousel'
import React from 'react'
import { Card,CardContent } from '@/components/ui/card'
import BestSellers from '@/components/BestSellers'
import BestSellingThemes from '@/components/BestSellingThemes'
import { Sparkles, Home, Users } from "lucide-react";
import NewIn from '@/components/NewIn'
import OurStorySection from '@/components/OurStorySection'

const page = () => {
  return (
    <div>
        <TonotoHeroCarousel/>
        <ShopByCategories/>
        <div id='hero-image-1' className="min-w-full p-1">
            <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">Hero Image</span>
                </CardContent>
            </Card>
        </div>
        <BestSellers/>
        <BestSellingThemes/>
        <div id='hero-image-2' className="min-w-full p-1">
            <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">Hero Image 2</span>
                </CardContent>
            </Card>
        </div>
        <div id='text-content'>
        <section className="text-center px-4 py-12 max-w-xl mx-auto">
            <h2 className="text-3xl font-cursive text-[#414141] mb-4">Why Choose Us</h2>
            <p className="text-[#414141] text-base leading-7 mb-10">
                Our handcrafted accessories blend traditional embroidery with quirky designs,
                celebrating Indian artisans. At Krinuh, we create unique, lightweight, and trendy
                accessories with attention to detail.
            </p>

            <div className="flex flex-row justify-between gap-8 text-[#a04478]">
                <div className="flex flex-col items-center">
                <Sparkles className="w-8 h-8 mb-2" />
                <p className="text-sm font-semibold">100% Handmade</p>
                </div>

                <div className="flex flex-col items-center">
                <Home className="w-8 h-8 mb-2" />
                <p className="text-sm font-semibold text-center">In-House<br />Design & Production</p>
                </div>

                <div className="flex flex-col items-center">
                <Users className="w-8 h-8 mb-2" />
                <p className="text-sm font-semibold text-center">2 lakh+<br />Products Sold</p>
                </div>
            </div>
            </section>
        </div>
        <div id='hero-image-3' className="min-w-full p-1">
            <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">Hero Image 3</span>
                </CardContent>
            </Card>
        </div>
        <NewIn/>
        <div id='Our-Story' className=''>
            <OurStorySection/>
        </div>
    </div>
  )
}

export default page