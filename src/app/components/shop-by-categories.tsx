import Link from "next/link"

// Category data
const categories = [
  {
    id: 1,
    name: "INDIAN EARRINGS",
    href: "/jewellery?category=earrings",
    image: "/images/categories/earrings.jpg",
  },
  {
    id: 2,
    name: "HEAD ACCESSORIES",
    href: "/jewellery?category=head",
    image: "/images/categories/head.jpg",
  },
  {
    id: 3,
    name: "INDIAN NECKPIECES",
    href: "/jewellery?category=necklaces",
    image: "/images/categories/necklaces.jpg",
  },
  {
    id: 4,
    name: "HAND ACCESSORIES",
    href: "/jewellery?category=bracelets",
    image: "/images/categories/hand.jpg",
  },
  {
    id: 5,
    name: "FOOT ACCESSORIES",
    href: "/jewellery?category=anklets",
    image: "/images/categories/foot.jpg",
  },
  {
    id: 6,
    name: "INDIAN HAIR ACCESSORIES",
    href: "/jewellery?category=hair",
    image: "/images/categories/hair.jpg",
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
                {/* Category image or placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-[#f8e8f3] to-[#e8d5eb] flex items-center justify-center">
                  <div className="text-[#942972] text-opacity-30 text-4xl font-light">
                    {category.name.substring(0, 2)}
                  </div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Category name */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-sm md:text-base lg:text-lg font-semibold text-center px-4 tracking-wider">
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
