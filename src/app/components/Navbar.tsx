"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Search, ShoppingBag, X, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { SearchDialog } from "@/components/search-dialog"
import { useCart } from "@/Context/cart-context"

const navItems = [
  { name: "Paintings", href: "/gallery" },
  // { name: "Decorations", href: "/decorations" },
  { name: "Jewelry", href: "/jewellery" },
  { name: "Themes", href: "/themes" },
]

const mobileNavItems = [
  { name: "Paintings", href: "/gallery", hasArrow: true },
  // { name: "Wall Art", href: "/gallery?type=wall-art", hasArrow: false },
  // { name: "Canvas Prints", href: "/gallery?type=canvas", hasArrow: false },
  // { name: "Decorations", href: "/decorations", hasArrow: true },
  // { name: "Home Accents", href: "/decorations?type=accents", hasArrow: false },
  // { name: "Vases & Planters", href: "/decorations?type=vases", hasArrow: false },
  { name: "Jewelry", href: "/jewellery", hasArrow: true },
  { name: "Earrings", href: "/jewellery?category=earrings", hasArrow: false },
  { name: "Necklaces", href: "/jewellery?category=necklaces", hasArrow: false },
  // { name: "Bracelets", href: "/jewellery?category=bracelets", hasArrow: false },
  { name: "Themes", href: "/themes", hasArrow: true },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { cartItems } = useCart()

  // Calculate total items in cart
  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0)

  return (
    <header className="border-b border-krinuh-hairline sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4">
        {/* ADDED 'relative' HERE to contain the absolute mobile logo */}
        <div className="flex h-16 items-center justify-between relative">
          
          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className="text-krinuh-text/75" aria-label="Open menu">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs p-0 bg-krinuh-secondary">
              <div className="flex items-center justify-center h-16 border-b border-krinuh-secondaryBorder">
                <SheetClose className="absolute left-4">
                  <X size={24} className="text-krinuh-text/75" />
                </SheetClose>
                <Link href="/" className="text-krinuh-primary text-2xl font-semibold">
                  KRINUH
                </Link>
              </div>
              <div className="py-4 px-6 space-y-4">
                {/* Search in mobile menu */}
                <div className="py-2 border-b border-krinuh-secondaryBorder">
                  <Link href="/search" className="flex items-center text-krinuh-text/75 text-lg">
                    <Search size={20} className="mr-2" />
                    Search
                  </Link>
                </div>

                {mobileNavItems.map((item) => (
                  <div key={item.name} className="py-2 border-b border-krinuh-secondaryBorder last:border-b-0">
                    <Link
                      href={item.href}
                      className="flex items-center justify-between text-krinuh-text/75 text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                      {item.hasArrow && <ChevronRight size={20} />}
                    </Link>
                  </div>
                ))}
                <div className="pt-6 flex gap-4">
                  <Link href="#" className="bg-krinuh-primary text-white p-2 rounded-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </Link>
                  <Link href="#" className="text-krinuh-text/75">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* FIX APPLIED HERE: Added lg:static to restore normal flex flow on desktop */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <Link href="/" className="flex flex-col items-center leading-none">
              <span className="font-serif text-krinuh-primary text-2xl font-medium tracking-[0.15em]">KRINUH</span>
              <span className="font-script text-krinuh-muted text-sm -mt-0.5">by Shweta Tyagi</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link href={item.href} className="text-krinuh-text/75 hover:text-krinuh-primary transition-colors">
                  {item.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Right navigation */}
          <div className="flex items-center space-x-4">
            {/* Search dialog */}
            <SearchDialog className="text-krinuh-text/75 hover:text-krinuh-primary" />

            {/* Cart link with counter */}
            <Link href="/cart" className="relative text-krinuh-text/75 hover:text-krinuh-primary" aria-label="Cart">
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-krinuh-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </Link>
          </div>
          
        </div>
      </div>
    </header>
  )
}