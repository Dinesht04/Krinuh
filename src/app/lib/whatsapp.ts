// Central place for the artist's WhatsApp contact number and helpers to build
// wa.me deep links. The number is also referenced in TonotoFooter.jsx.
export const WHATSAPP_NUMBER = "919783194096" // +91 83023 86540, digits only (no +)

export const DEFAULT_WHATSAPP_MESSAGE = "hi, I wanted to talk about your art?"

// Build a wa.me link with a pre-filled message.
export function buildWhatsAppUrl(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
