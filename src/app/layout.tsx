import TonotoFooter from "./components/TonotoFooter";
import { Inter } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import { CartProvider } from "@/Context/cart-context"
import { Toaster } from "sonner"
import WakeBackend from "./lib/wake-backend";

const inter = Inter({ subsets: ["latin"] })


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
      <body className=" ">
              <WakeBackend />
        
          <CartProvider>
            
              {children}
              <TonotoFooter/>
              <Toaster  />
           
          </CartProvider>
     
        
        <Toaster />
      </body>
    </html>
  );
}
