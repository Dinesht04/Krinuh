"use client"

import Link from "next/link"
import { CldImage } from "next-cloudinary"

// Painting themes. Each tile uses a representative existing painting.
// Tiles link to a themed gallery view; the gallery-side filter is future scope.
const themes = [
  { name: "Landscapes", href: "/themes/6a4a7e2e6fd199e4680c3793", cldId: "1_qkd7bo" },
  { name: "Florals", href: "/themes/6a4a7e406fd199e4680c3794", cldId: "8_m1iwic" },
  { name: "Seascapes", href: "/themes/6a4a7e4f6fd199e4680c3795", cldId: "43_x1uhw4" },
  { name: "Spiritual", href: "/themes/6a4a7e5b6fd199e4680c3796", cldId: "4_w1tcmr" },
]

export function ShopByTheme() {
  return (
    <section className="py-tn-3xl">
      <div className="text-center mb-tn-xl px-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-krinuh-primary font-semibold">Find your wall</p>
        <h2 className="font-serif text-3xl font-medium text-krinuh-ink mt-1.5">Shop by Theme</h2>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 px-4 max-w-2xl mx-auto">
        {themes.map((t) => (
          <Link key={t.name} href={t.href} className="group relative aspect-square overflow-hidden">
            <CldImage
              src={t.cldId}
              alt={t.name}
              fill
              sizes="(max-width:640px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute inset-x-0 bottom-3.5 text-center text-white text-xs uppercase tracking-[0.15em] font-semibold">
              {t.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
