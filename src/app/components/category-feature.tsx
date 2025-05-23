import Link from "next/link"

export function CategoryFeature() {
  return (
    <div className="py-12 bg-[#f8f8f8]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-[#414141]">Shop by Category</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden rounded-lg shadow-md">
            <div className="bg-[#f8e8f3] w-full h-64 flex items-center justify-center">
              <div className="text-[#942972] text-opacity-20 text-6xl font-light">PA</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 w-full">
                <h3 className="text-white text-xl font-semibold mb-2">Paintings</h3>
                <p className="text-white/80 mb-4 text-sm">Elevate your space with our handcrafted paintings</p>
                <Link href="/v2/gallery">
                  <button className="bg-white text-[#942972] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#f8e8f3] transition-colors">
                    Explore Collection
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-lg shadow-md">
            <div className="bg-[#f8e8f3] w-full h-64 flex items-center justify-center">
              <div className="text-[#942972] text-opacity-20 text-6xl font-light">DE</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 w-full">
                <h3 className="text-white text-xl font-semibold mb-2">Decorations</h3>
                <p className="text-white/80 mb-4 text-sm">Transform your home with our unique decorative pieces</p>
                <Link href="/v2/decorations">
                  <button className="bg-white text-[#942972] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#f8e8f3] transition-colors">
                    Explore Collection
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-lg shadow-md">
            <div className="bg-[#f8e8f3] w-full h-64 flex items-center justify-center">
              <div className="text-[#942972] text-opacity-20 text-6xl font-light">JE</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 w-full">
                <h3 className="text-white text-xl font-semibold mb-2">Jewelry</h3>
                <p className="text-white/80 mb-4 text-sm">Adorn yourself with our exquisite handcrafted jewelry</p>
                <Link href="/v2/jewellery">
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
