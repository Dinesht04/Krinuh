import Image from "next/image"
import Link from "next/link"

// Category data with updated images
const categories = [
  {
    id: 1,
    name: "INDIAN EARRINGS",
    href: "/jewellery?category=earrings",
    image: "https://www.tonoto.in/cdn/shop/files/Untitled-1_llllllllllllllllll.jpg?v=1732699250&width=535",
  },
  {
    id: 2,
    name: "HEAD ACCESSORIES",
    href: "/jewellery?category=head",
    image:
      "https://www.tonoto.in/cdn/shop/files/Untitled-3322_7faf3aad-d810-46ee-ae62-776918f9a08a.jpg?v=1732776977&width=535",
  },
  {
    id: 3,
    name: "INDIAN NECKPIECES",
    href: "/jewellery?category=necklaces",
    image: "https://www.tonoto.in/cdn/shop/files/999999999999999.jpg?v=1732693155&width=535",
  },
  {
    id: 4,
    name: "HAND ACCESSORIES",
    href: "/jewellery?category=bracelets",
    image: "https://www.tonoto.in/cdn/shop/files/Untitled-3333333333333444444444.jpg?v=1732786950&width=535",
  },
  {
    id: 5,
    name: "FOOT ACCESSORIES",
    href: "/jewellery?category=anklets",
    image: "https://www.tonoto.in/cdn/shop/files/4444444444444.jpg?v=1732696478&width=535",
  },
  {
    id: 6,
    name: "INDIAN HAIR ACCESSORIES",
    href: "/jewellery?category=hair",
    image: "https://www.tonoto.in/cdn/shop/files/hair.jpg?v=1732697289&width=535",
  },
]

export function ShopByCategories() {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-[#414141] tracking-wider">
          SHOP BY CATEGORIES
        </h2>

        {/* Mobile: Single column grid, Tablet: 2 columns, Desktop: 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={category.href} className="group">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                {/* Category image */}
                <Image
                  src={category.image || "/placeholder.svg"}
                  height={360}
                  width={360}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Category name */}
                <div className="absolute inset-0 flex items-end pb-12 justify-center">
                  <h3 className="text-white md:text-base lg:text-lg font-semibold text-center px-4 tracking-wider">
                    {category.name}
                  </h3>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-[#942972]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-8">
          <Link href="/jewellery">
            <button className="bg-[#942972] hover:bg-[#7b1d5e] text-white px-6 py-3 rounded-full font-medium transition-colors duration-200">
              Explore All Jewelry
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
