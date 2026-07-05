"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CldImage } from "next-cloudinary"
import { Skeleton } from "@/components/ui/skeleton"

interface PaintingAPIResponse {
  success: boolean
  data: Array<{
    _id: string
    title: string
    price: string
    cldImagePublicIds: string[]
    sold: boolean
  }>
}

type RailItem = { id: string; title: string; price: string; cldId: string }

function formatPrice(raw: string) {
  const n = Number.parseInt(raw.replace(/[^0-9]/g, ""))
  return Number.isNaN(n) ? raw : n.toLocaleString("en-IN")
}

const MAX_ATTEMPTS = 6

export function PaintingsRail() {
  const [items, setItems] = useState<RailItem[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load(attempt: number) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000)
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/painting/all", {
          cache: "no-store",
          signal: controller.signal,
        })
        clearTimeout(timeoutId)
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        const apiData: PaintingAPIResponse = await response.json()
        if (!apiData.success || !apiData.data) throw new Error("Malformed response")
        if (cancelled) return
        const mapped = apiData.data
          .filter((p) => !p.sold && p.cldImagePublicIds?.length)
          .slice(0, 8)
          .map((p) => ({
            id: p._id,
            title: p.title,
            price: formatPrice(p.price),
            cldId: p.cldImagePublicIds[0],
          }))
        setItems(mapped)
      } catch {
        if (cancelled) return
        if (attempt < MAX_ATTEMPTS) {
          setTimeout(() => !cancelled && load(attempt + 1), 2000 * attempt)
        } else {
          setFailed(true)
        }
      }
    }

    load(1)
    return () => {
      cancelled = true
    }
  }, [])

  // Keep the homepage clean if the backend can't be reached.
  if (failed || (items && items.length === 0)) return null

  return (
    <section className="py-tn-3xl">
      <div className="text-center mb-tn-xl px-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-krinuh-primary font-semibold">Best sellers</p>
        <h2 className="font-serif text-3xl font-medium text-krinuh-ink mt-1.5">Paintings People Love</h2>
      </div>

      <div className="flex gap-3 overflow-x-auto px-4 pb-1.5 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items === null
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-none w-[62%] sm:w-[40%] lg:w-[23%]">
                <Skeleton className="aspect-[3/4] rounded-none" />
                <Skeleton className="h-4 w-2/3 mt-2.5 rounded-none" />
                <Skeleton className="h-4 w-1/3 mt-1.5 rounded-none" />
              </div>
            ))
          : items.map((p, index) => (
              <Link
                key={p.id}
                href={`/gallery/${p.id}`}
                className="group flex-none w-[62%] sm:w-[40%] lg:w-[23%] snap-start"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-krinuh-ash">
                  <CldImage
                    src={p.cldId}
                    alt={p.title}
                    fill
                    sizes="(max-width:640px) 62vw, (max-width:1024px) 40vw, 23vw"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  {index === 0 && (
                    <span className="absolute top-0 left-0 bg-krinuh-secondary text-krinuh-primaryDark text-[10px] font-semibold tracking-wide px-2.5 py-1">
                      Best Seller
                    </span>
                  )}
                </div>
                <h3 className="text-[13px] font-semibold text-krinuh-text mt-2.5 leading-snug">{p.title}</h3>
                <p className="text-[13px] font-semibold text-krinuh-ink mt-0.5">₹{p.price}</p>
              </Link>
            ))}
      </div>

      <div className="text-center mt-tn-xl">
        <Link
          href="/gallery"
          className="inline-block bg-krinuh-text text-white text-xs uppercase tracking-[0.15em] font-semibold px-7 py-3 hover:bg-krinuh-ink transition-colors"
        >
          View all paintings
        </Link>
      </div>
    </section>
  )
}
