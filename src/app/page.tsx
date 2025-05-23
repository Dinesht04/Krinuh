import Navbar from "@/components/Navbar"
import { HeroCarousel } from "@/components/hero-carousel"
import { ProductCarousel } from "@/components/product-carousel"
import { CategoryFeature } from "@/components/category-feature"
import { ShopByCategories } from "@/components/shop-by-categories"
import { CustomWorkSection } from "@/components/custom-work-section"
import {
  heroSlides,
  announcements,
  paintingsData,
  jewelryData,
  decorationsData,
  bestSellersData,
} from "./v2/sampleData"
import TonotoOfferCarousel from "@/components/TonotoOfferCarousel"
import OurStorySection from "@/components/OurStorySection"

//todo

export default function Home() {
  // Filter for unsold paintings and limit to 7
  const availablePaintings = paintingsData.filter((painting) => !painting.Sold).slice(0, 7)

  // Limit jewelry and decorations to 7 each
  const limitedJewelry = jewelryData.slice(0, 7)
  const limitedDecorations = decorationsData.slice(0, 7)

  // Limit best sellers to 7
  const limitedBestSellers = bestSellersData.slice(0, 7)

  return (
    <main className="min-h-screen">
      <Navbar />
      <TonotoOfferCarousel/>
      <HeroCarousel slides={heroSlides} />

      <ProductCarousel title="Best Sellers" products={limitedBestSellers} />

      <ShopByCategories />

      <CategoryFeature />

      <OurStorySection/>

      <div id="paintings">
        <ProductCarousel
          title="Beautiful Paintings"
          products={availablePaintings}
          className="bg-[#f8f8f8]"
          viewAllLink="/gallery"
        />
      </div>

      <CustomWorkSection />

      <div id="decorations">
        <ProductCarousel title="Home Decorations" products={limitedDecorations} viewAllLink="/decorations" />
      </div>

      <div id="jewelry">
        <ProductCarousel
          title="Exquisite Jewelry"
          products={limitedJewelry}
          className="bg-[#f8f8f8]"
          viewAllLink="/jewellery"
        />
      </div>

    </main>
  )
}
