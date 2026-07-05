"use client"

import Link from "next/link"
import { CldImage } from "next-cloudinary"

// Secondary "also handcrafted" edit. Kept small on purpose — jewellery is the
// secondary offering and we don't yet have enough of it for themes (future scope).
const items = [
  { id: "6a12b732813513365810f925", name: "Rosy Bloom Set", price: "1,500", cldId: "jewel-1_bemfp6" },
  { id: "6a4a7a34590e670bc2bc8225", name: "Wisteria Petal Set", price: "1,500", cldId: "jewelry-2_hgruse" },
]

export function JewelleryStrip() {
  return (
    <section className="py-tn-2xl">
      <div className="text-center mb-tn-lg px-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-krinuh-primary font-semibold">Also handcrafted</p>
        <h2 className="font-serif text-2xl font-medium text-krinuh-ink mt-1.5">Jewellery</h2>
        <p className="text-[13px] text-krinuh-muted mt-2 max-w-xs mx-auto">
          A small, hand-picked edit — same maker, same care.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 max-w-lg mx-auto">
        {items.map((j) => (
          <Link key={j.id} href={`/jewellery/${j.id}`} className="group">
            <div className="relative aspect-square overflow-hidden bg-krinuh-ash">
              <CldImage
                src={j.cldId}
                alt={j.name}
                fill
                sizes="(max-width:640px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="text-xs font-semibold text-krinuh-text mt-2">{j.name}</h3>
            <p className="text-xs font-semibold text-krinuh-ink mt-0.5">₹{j.price}</p>
          </Link>
        ))}
      </div>

      <div className="text-center mt-tn-lg">
        <Link
          href="/jewellery"
          className="inline-block bg-white border-[1.5px] border-krinuh-text text-krinuh-text text-xs uppercase tracking-[0.15em] font-semibold px-6 py-2.5 hover:bg-krinuh-text hover:text-white transition-colors"
        >
          Browse jewellery
        </Link>
      </div>
    </section>
  )
}
