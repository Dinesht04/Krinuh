"use client"

import { useState } from "react"
import { CldImage } from "next-cloudinary"
import { EnquiryForm } from "@/components/enquiry-form"

/**
 * Signature USP banner — Krinuh's answer to Tonoto's "Make Your Own Set".
 * Sells a service (custom / repaint), so it needs no catalog inventory and is
 * the strongest differentiator on the page. CTA opens the existing enquiry form.
 */
export function RepaintBanner() {
  const [open, setOpen] = useState(false)

  return (
    <section
      id="custom-work"
      className="relative w-full overflow-hidden h-[360px] sm:h-[420px] lg:h-[500px] lg:max-w-6xl lg:mx-auto text-white"
    >
      <CldImage
        src="repaint-memory_vk8biq"
        alt="Repaint a memory — turn a photo into a hand-painted canvas"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/45" />

      {/* Ornate frame + corner brackets */}
      <div className="pointer-events-none absolute inset-3 sm:inset-4 border border-white/35" />
      <span className="pointer-events-none absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 border-white/85" />
      <span className="pointer-events-none absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 border-white/85" />
      <span className="pointer-events-none absolute bottom-5 left-5 w-4 h-4 border-b-2 border-l-2 border-white/85" />
      <span className="pointer-events-none absolute bottom-5 right-5 w-4 h-4 border-b-2 border-r-2 border-white/85" />

      <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-8">
        {/* Semi-opaque panel behind the copy — tweak bg-black/xx or swap the tint to taste */}
        <div className="max-w-[15rem] sm:max-w-sm text-right bg-black/50 backdrop-blur-[2px] p-5 sm:p-7">
          <span className="font-script text-2xl sm:text-3xl block">First in Jaipur,</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium leading-tight mt-1 mb-3">Repaint a Memory</h2>
          <p className="text-xs sm:text-sm leading-relaxed opacity-95 mb-5">
            Send us a photo — a place, a person, a pet. We hand-paint it on canvas. Your story, your size, your budget.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="border border-white text-white text-[11px] sm:text-xs uppercase tracking-[0.15em] font-semibold px-5 py-3 hover:bg-white hover:text-krinuh-text transition-colors rounded-none"
          >
            Start your commission
          </button>
        </div>
      </div>

      <EnquiryForm
        isOpen={open}
        onClose={() => setOpen(false)}
        enquiryType="custom"
        category="paintings"
      />
    </section>
  )
}
