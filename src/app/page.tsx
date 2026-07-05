import Navbar from "@/components/Navbar"
import TonotoOfferCarousel from "@/components/TonotoOfferCarousel"
import { LandingHero } from "@/components/landing-hero"
import { RepaintBanner } from "@/components/repaint-banner"
import { PaintingsRail } from "@/components/paintings-rail"
import { SmallWorksPromo } from "@/components/small-works-promo"
import { ShopByTheme } from "@/components/shop-by-theme"
import { JewelleryStrip } from "@/components/jewellery-strip"
import { TrustBand } from "@/components/trust-band"
import OurStorySection from "@/components/OurStorySection"
import { PopularSearches } from "@/components/popular-searches"

const microTrust = ["Hand-painted", "1-of-1 Original", "Made in Jaipur"]

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <TonotoOfferCarousel />

      <LandingHero />

      {/* Micro trust strip */}
      <div className="flex border-b border-krinuh-hairline">
        {microTrust.map((t) => (
          <div
            key={t}
            className="flex-1 text-center py-3 text-[10.5px] uppercase tracking-[0.1em] text-krinuh-muted border-l border-krinuh-hairline first:border-l-0"
          >
            {t}
          </div>
        ))}
      </div>

      <RepaintBanner />

      <PaintingsRail />

      <SmallWorksPromo />

      <ShopByTheme />

      <JewelleryStrip />

      <TrustBand />

      <OurStorySection />

      <PopularSearches />
    </main>
  )
}
