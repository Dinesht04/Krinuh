"use client"

import Link from "next/link"
import { CldImage } from "next-cloudinary"

/** Editorial promo for the affordable small paintings (₹250–1000) — a gifting hook. */
export function SmallWorksPromo() {
  return (
    <section className="relative w-full overflow-hidden h-[230px] sm:h-[280px] lg:h-[400px] lg:max-w-6xl lg:mx-auto text-white my-2">
      <CldImage
        src="small-works_ujflti"
        alt="Little original paintings, framed as a gallery cluster"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 to-black/10" />
      <div className="pointer-events-none absolute inset-3 border border-white/30" />
      <div className="absolute inset-y-0 left-0 flex items-center">
        <div className="pl-6 sm:pl-12 max-w-[13rem] sm:max-w-xs">
          <span className="font-script text-2xl block">Under ₹1000</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium leading-tight mt-1 mb-4">
            Little Originals, Big Feeling
          </h2>
          <Link
            href="/gallery"
            className="inline-block border border-white text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-5 py-3 hover:bg-white hover:text-krinuh-text transition-colors"
          >
            Shop small works
          </Link>
        </div>
      </div>
    </section>
  )
}
