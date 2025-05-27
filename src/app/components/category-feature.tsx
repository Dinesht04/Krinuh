"use client"

import { CldImage } from "next-cloudinary"
import Image from "next/image"
import Link from "next/link"

export function CategoryFeature() {
  return (
    <div className="py-12 bg-[#f8f8f8]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-[#414141]">Shop by Category</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden rounded-lg shadow-md">
            <div className="w-full h-64 overflow-hidden">
              <CldImage
                src="52_fbpdi4"
                height={360}
                width={360}
                alt="Paintings"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 w-full">
                <h3 className="text-white text-xl font-semibold mb-2">Paintings</h3>
                <p className="text-white/80 mb-4 text-sm">Elevate your space with our handcrafted paintings</p>
                <Link href="/gallery">
                  <button className="bg-white text-[#942972] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#f8e8f3] transition-colors">
                    Explore Collection
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-lg shadow-md">
            <div className="w-full h-64 overflow-hidden">
              <CldImage
                src="Screenshot_from_2025-05-28_00-48-44_oydw9o"
                alt="Decorations"
                height={360}
                width={360}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 w-full">
                <h3 className="text-white text-xl font-semibold mb-2">Decorations</h3>
                <p className="text-white/80 mb-4 text-sm">Transform your home with our unique decorative pieces</p>
                <Link href="/decorations">
                  <button className="bg-white text-[#942972] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#f8e8f3] transition-colors">
                    Explore Collection
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-lg shadow-md">
            <div className="w-full h-64 overflow-hidden">
              <Image
                src="https://www.tonoto.in/cdn/shop/files/gul_earrings_ecccfbcd-3f8f-47e0-a1b1-18d2ba11fd5a.jpg?v=1731410723&width=360"
                height={360}
                width={360}
                alt="Jewelry"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 w-full">
                <h3 className="text-white text-xl font-semibold mb-2">Jewelry</h3>
                <p className="text-white/80 mb-4 text-sm">Adorn yourself with our exquisite handcrafted jewelry</p>
                <Link href="/jewellery">
                  <button className="bg-white text-[#942972] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#f8e8f3] transition-colors">
                    Explore Collection
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
