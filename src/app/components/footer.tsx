import { Instagram, Facebook, Twitter } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#f8f8f8] pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-[#414141] mb-4">About Krinuh</h3>
            <p className="text-[#414141BF] text-sm mb-4">
              Krinuh offers unique, handcrafted paintings, decorations, and jewelry to elevate your space and style.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-[#942972] hover:text-[#7b1d5e]">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-[#942972] hover:text-[#7b1d5e]">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-[#942972] hover:text-[#7b1d5e]">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#414141] mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#paintings" className="text-[#414141BF] hover:text-[#942972]">
                  Paintings
                </Link>
              </li>
              <li>
                <Link href="#decorations" className="text-[#414141BF] hover:text-[#942972]">
                  Decorations
                </Link>
              </li>
              <li>
                <Link href="#jewelry" className="text-[#414141BF] hover:text-[#942972]">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#414141BF] hover:text-[#942972]">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#414141BF] hover:text-[#942972]">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#414141] mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-[#414141BF] hover:text-[#942972]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#414141BF] hover:text-[#942972]">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#414141BF] hover:text-[#942972]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#414141BF] hover:text-[#942972]">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#414141] mb-4">Newsletter</h3>
            <p className="text-[#414141BF] text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#942972]"
              />
              <button className="bg-[#942972] text-white px-3 py-2 text-sm rounded-r-md hover:bg-[#7b1d5e]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#414141BF] text-sm mb-4 md:mb-0">© 2023 Krinuh. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-[#414141BF] text-sm hover:text-[#942972]">
                Privacy Policy
              </Link>
              <Link href="#" className="text-[#414141BF] text-sm hover:text-[#942972]">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
