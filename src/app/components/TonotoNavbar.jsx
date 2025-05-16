"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight, Search, ShoppingBag, User, X, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Rakhis", href: "#", hasSubmenu: true },
  { name: "Jewellery", href: "#", hasSubmenu: true },
  { name: "Shop by Category", href: "#", hasSubmenu: true },
  { name: "Handbags", href: "#", hasSubmenu: true },
]

const rightNavItems = [
  { name: "Make Your Own Set", href: "#" },
  { name: "Info", href: "#", hasSubmenu: true },
]

const mobileNavItems = [
  { name: "Make your Own Set", href: "#" },
  { name: "Rakhis", href: "#", hasArrow: true },
  { name: "Western Accessories", href: "#" },
  { name: "Jewellery Sets", href: "#", hasArrow: true },
  { name: "Shop Jewellery by Category", href: "#", hasArrow: true },
  { name: "Handbags", href: "#", hasArrow: true },
  { name: "Info", href: "#", hasArrow: true },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className="text-[#414141BF]" aria-label="Open menu">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs p-0 bg-[#dfcce3]">
              <div className="flex items-center justify-center h-16 border-b border-[#d0bdd7]">
                <SheetClose className="absolute left-4">
                  <X size={24} className="text-[#414141BF]" />
                </SheetClose>
                <Link href="/" className="text-[#942972] text-2xl font-semibold">
                  KRINUH
                </Link>
              </div>
              <div className="py-4 px-6 space-y-4">
                {mobileNavItems.map((item) => (
                  <div key={item.name} className="py-2 border-b border-[#d0bdd7] last:border-b-0">
                    <Link href={item.href} className="flex items-center justify-between text-[#414141BF] text-lg">
                      {item.name}
                      {item.hasArrow && <ChevronRight size={20} />}
                    </Link>
                  </div>
                ))}
                <div className="pt-4 space-y-4">
                  <Link href="#" className="flex items-center text-[#414141BF] gap-2">
                    <User size={20} />
                    <span>Log in / Register</span>
                  </Link>
                  <Link href="#" className="flex items-center text-[#414141BF] gap-2">
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
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>Track Your Order</span>
                  </Link>
                </div>
                <div className="pt-6 flex gap-4">
                  <Link href="#" className="bg-teal-700 text-white p-2 rounded-md">
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
                  <Link href="#" className="text-[#414141BF]">
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
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </Link>
                  <Link href="#" className="text-[#414141BF]">
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

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link href={item.href} className="flex items-center text-[#414141BF] hover:text-gray-900">
                  {item.name}
                  {item.hasSubmenu && <ChevronDown size={16} className="ml-1" />}
                </Link>
              </div>
            ))}
          </nav>

          {/* Logo */}
          <div className={cn("absolute left-1/2 transform -translate-x-1/2", "lg:static lg:transform-none lg:left-0")}>
            <Link href="/" className="text-[#942972] text-2xl font-semibold">
              KRINUH
            </Link>
          </div>

          {/* Right navigation */}
          <div className="flex items-center space-x-4">
            <nav className="hidden lg:flex items-center space-x-6">
              {rightNavItems.map((item) => (
                <div key={item.name} className="relative group">
                  <Link href={item.href} className="flex items-center text-[#414141BF] hover:text-gray-900">
                    {item.name}
                    {item.hasSubmenu && <ChevronDown size={16} className="ml-1" />}
                  </Link>
                </div>
              ))}
            </nav>
            <button className="text-[#414141BF]" aria-label="Search">
              <Search size={20} />
            </button>
            {/* <Link href="#" className="text-[#414141BF]" aria-label="Account">
              <User size={20} />
            </Link> */}
            <Link href="#" className="text-[#414141BF]" aria-label="Cart">
              <ShoppingBag size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
