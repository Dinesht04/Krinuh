"use client"

import Link from "next/link"
import { CldImage } from "next-cloudinary"

/**
 * Statement hero — a single bold original (currently the black horse) framed as an
 * editorial "edit". Leans into Krinuh's strength: one striking painting does the work
 * of a lifestyle photoshoot. Rename the campaign line freely.
 */
export function LandingHero() {
  return (
    <section className="relative w-full overflow-hidden h-[72vh] min-h-[460px] max-h-[680px] lg:h-[82vh] lg:max-h-none bg-krinuh-ink">
      <CldImage
        src="hero-horse_ai7h1j"
        alt="The Statement Edit — original hand-painted artwork"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_30%] lg:object-contain"
      />

      {/* Legibility veil */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />

      {/* Editorial copy */}
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-16 text-white">
        <span className="font-script text-3xl sm:text-4xl block drop-shadow-md">The</span>
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium leading-[0.95] tracking-wide drop-shadow-lg">
          STATEMENT
          <br />
          PIECE
        </h1>
        <span className="font-serif text-xl sm:text-2xl tracking-[0.4em] block mt-3 opacity-95">2026</span>
        <Link
          href="/gallery"
          className="inline-block mt-6 text-xs sm:text-sm uppercase tracking-[0.2em] border-b border-white/70 pb-1 hover:border-white transition-colors"
        >
          Shop the collection →
        </Link>
      </div>
    </section>
  )
}
