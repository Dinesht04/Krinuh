import TonotoFooter from "./components/TonotoFooter";
import { Plus_Jakarta_Sans, Sacramento, Playfair_Display } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import { CartProvider } from "@/Context/cart-context"
import { Toaster } from "sonner"
import WakeBackend from "./lib/wake-backend";
import WhatsAppFloat from "./components/WhatsAppFloat";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" })
const sacramento = Sacramento({ subsets: ["latin"], weight: "400", variable: "--font-sacramento" })
// Serif display face for editorial headings (Tonoto-style high-contrast serif)
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-serif" })


export const metadata : Metadata = {
  title: "Krinuh - Handcrafted Art, Jewelry & Decorations",
  description: "Discover unique handcrafted paintings, jewelry, and home decorations at Krinuh.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/dragonfly.png" sizes="any" />
      </head>
      <body className={`${jakarta.variable} ${sacramento.variable} ${playfair.variable} font-sans`}>
              <WakeBackend />
        
          <CartProvider>
            
              {children}
              <TonotoFooter/>
              <WhatsAppFloat />
              <Toaster  />
           
          </CartProvider>
     
        
        <Toaster />
      </body>
    </html>
  );
}
