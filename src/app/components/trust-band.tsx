import { Brush, Sparkle, Home } from "lucide-react"

const items = [
  { Icon: Brush, h: "Hand-painted", d: "Every piece made by Shweta's own hand" },
  { Icon: Sparkle, h: "One of one", d: "Originals — never a print, never repeated" },
  { Icon: Home, h: "Made in Jaipur", d: "Packed & shipped with care from the studio" },
]

export function TrustBand() {
  return (
    <section className="bg-krinuh-secondary py-tn-2xl px-4">
      <div className="grid grid-cols-3 gap-2.5 max-w-3xl mx-auto text-center">
        {items.map(({ Icon, h, d }) => (
          <div key={h}>
            <Icon className="w-7 h-7 mx-auto mb-2 text-krinuh-primary" strokeWidth={1.5} />
            <p className="text-xs font-bold text-krinuh-primaryDark tracking-wide">{h}</p>
            <p className="text-[10px] leading-snug text-krinuh-muted mt-1">{d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
