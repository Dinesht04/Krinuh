"use client";

import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function TonotoFooter() {
  return (
    <footer className="bg-krinuh-secondary text-krinuh-text px-6 pt-16 pb-4">
      <div className="max-w-md mx-auto flex flex-col items-center text-center gap-10 pt-4">
        {/* Brand */}
        <div className="leading-none">
          <span className="font-serif text-krinuh-primary text-2xl font-medium tracking-[0.15em]">KRINUH</span>{" "}
          <span className="font-script text-krinuh-muted text-lg">by Shweta Tyagi</span>
          <p className="max-w-xs mx-auto mt-5 text-xs text-krinuh-muted leading-relaxed">
            Original hand-painted art and handcrafted jewellery from Jaipur. Made in India, one
            piece at a time.
          </p>
        </div>

        {/* Contact */}
        <div className="">
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-krinuh-ink mb-4">Contact us</p>
          <div className="text-xs text-krinuh-text space-y-2.5">
            <p className="">
              WhatsApp{" "}
              <a href="https://wa.me/919783194096" className="hover:text-krinuh-primary">+91 83023 86540</a>
            </p>
            <p>
              <a href="mailto:contact.krinuh@gmail.com" className="hover:text-krinuh-primary">contact.krinuh@gmail.com</a>
            </p>
            <p className="py-2 text-krinuh-muted">Monday–Saturday, 10 AM – 6 PM</p>
          </div>
        </div>

        {/* Social */}
        <div className="flex justify-center gap-2 text-krinuh-ink text-lg">
          <a href="https://www.facebook.com/people/Krinuh/100063800927065/" aria-label="Facebook" className="hover:text-krinuh-primary transition-colors"><FaFacebookF /></a>
          <a href="https://www.instagram.com/krinuh.art/" aria-label="Instagram" className="hover:text-krinuh-primary transition-colors"><FaInstagram /></a>
          <a href="https://www.youtube.com/@krinuh" aria-label="Pinterest" className="hover:text-krinuh-primary transition-colors"><FaYoutube /></a>
        </div>

        {/* Newsletter */}
        <div className="w-full">
          <p className="text-xs text-krinuh-muted mb-3">Join the Krinuh family for new drops & offers.</p>
          <form className="flex w-full bg-white border-2 border-krinuh-primary" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              aria-label="Email"
              className="flex-1 bg-white px-4 py-3 text-sm text-krinuh-text placeholder:text-krinuh-muted focus:outline-none"
            />
            <button
              type="submit"
              className="bg-krinuh-primary text-white px-5 text-sm font-semibold hover:bg-krinuh-primaryDark transition-colors"
            >
              →
            </button>
          </form>
        </div>

        {/* Columns */}
        {/* <div className="flex justify-center gap-24 text-left">
          <div>
            <p className="text-[11px] uppercase tracking-wide font-bold text-krinuh-ink mb-4">About</p>
            <Link href="#custom-work" className="block text-xs text-krinuh-muted mb-3 hover:text-krinuh-primary">Custom Art</Link>
            <Link href="/gallery" className="block text-xs text-krinuh-muted hover:text-krinuh-primary">Our Story</Link>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide font-bold text-krinuh-ink mb-4">Shop</p>
            <Link href="/gallery" className="block text-xs text-krinuh-muted mb-3 hover:text-krinuh-primary">Paintings</Link>
            <Link href="/jewellery" className="block text-xs text-krinuh-muted hover:text-krinuh-primary">Jewellery</Link>
          </div>
        </div> */}

        {/* Copyright */}
        <p className="text-[11px] text-krinuh-muted pt-2 border-t border-krinuh-secondaryBorder w-full">
          © {new Date().getFullYear()} Krinuh. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
