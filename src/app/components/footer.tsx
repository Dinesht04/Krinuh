import { Instagram, Facebook, Twitter } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-krinuh-ash pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-krinuh-text mb-4">About Krinuh</h3>
            <p className="text-krinuh-text/75 text-sm mb-4">
              Krinuh offers unique, handcrafted paintings, decorations, and jewelry to elevate your space and style.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-krinuh-primary hover:text-krinuh-primaryDark">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-krinuh-primary hover:text-krinuh-primaryDark">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-krinuh-primary hover:text-krinuh-primaryDark">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-krinuh-text mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#paintings" className="text-krinuh-text/75 hover:text-krinuh-primary">
                  Paintings
                </Link>
              </li>
              <li>
                <Link href="#decorations" className="text-krinuh-text/75 hover:text-krinuh-primary">
                  Decorations
                </Link>
              </li>
              <li>
                <Link href="#jewelry" className="text-krinuh-text/75 hover:text-krinuh-primary">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link href="#" className="text-krinuh-text/75 hover:text-krinuh-primary">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="#" className="text-krinuh-text/75 hover:text-krinuh-primary">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-krinuh-text mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-krinuh-text/75 hover:text-krinuh-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-krinuh-text/75 hover:text-krinuh-primary">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="text-krinuh-text/75 hover:text-krinuh-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-krinuh-text/75 hover:text-krinuh-primary">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-krinuh-text mb-4">Newsletter</h3>
            <p className="text-krinuh-text/75 text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm border border-krinuh-hairline rounded-none focus:outline-none focus:ring-1 focus:ring-krinuh-primary"
              />
              <button className="bg-krinuh-primary text-white px-3 py-2 text-sm rounded-none hover:bg-krinuh-primaryDark">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-krinuh-hairline mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-krinuh-text/75 text-sm mb-4 md:mb-0">© 2023 Krinuh. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-krinuh-text/75 text-sm hover:text-krinuh-primary">
                Privacy Policy
              </Link>
              <Link href="#" className="text-krinuh-text/75 text-sm hover:text-krinuh-primary">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
