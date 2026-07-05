import Link from "next/link"

const searches = [
  { label: "Landscapes", href: "/gallery?theme=landscapes" },
  { label: "Buddha Paintings", href: "/gallery?theme=spiritual" },
  { label: "Floral Art", href: "/gallery?theme=florals" },
  { label: "Repaint a Photo", href: "#custom-work" },
  { label: "Custom Portrait", href: "#custom-work" },
  { label: "Seascapes", href: "/gallery?theme=seascapes" },
  { label: "Gifts under ₹1000", href: "/gallery" },
  { label: "Silver Jewellery", href: "/jewellery" },
]

export function PopularSearches() {
  return (
    <section className="bg-white text-center px-5 pb-tn-3xl pt-tn-sm">
      <h3 className="font-serif text-lg font-medium text-krinuh-ink mb-tn-lg">Popular Searches</h3>
      <div className="flex flex-wrap gap-x-2.5 gap-y-2 justify-center max-w-md mx-auto">
        {searches.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="text-[13px] text-krinuh-text border-b border-krinuh-hairline pb-0.5 hover:text-krinuh-primary hover:border-krinuh-primary transition-colors"
          >
            {s.label}
          </Link>
        ))}
      </div>
    </section>
  )
}
