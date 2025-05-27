import Image from "next/image";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";

export default function TonotoFooter() {
  return (
    <footer className="bg-[#dfcce3] text-black text-center px-4 py-10">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <Image
          src="/dragonfly.svg"
          alt="Sound of Colours"
          width={40}
          height={40}
        />
      </div>

      {/* Brand Name */}
      <h2 className="text-2xl font-bold mb-4 text-[#952e6a] tracking-wide">KRINUH</h2>

      {/* Description */}
      <p className="max-w-md mx-auto mb-6 text-sm leading-relaxed">
        Discover exquisite, handcrafted jewelry that radiates elegance and
        captures your unique style. A brand which stands for everything Made In
        India yet is modern and contemporary.
      </p>

      {/* Contact Section */}
      <div className="text-sm mb-6">
        <p className="font-bold">CONTACT US</p>
        <p className="font-semibold mt-2">For Order Related Queries:</p>
        <p className="mt-1">+91 83023 86540</p>
        <p className="mt-1">
          Please get in touch via WhatsApp or call <br />
          Hours: Monday – Saturday, 10 AM – 6 PM <br />
          Or write to us at <br />
          <a href="mailto:contact.soundofcolours@gmail.com" className="underline">
            contact.soundofcolours@gmail.com
          </a>
        </p>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 mt-6 text-[#952e6a] text-lg">
        <a
          href="https://www.youtube.com/@sound_of_colours"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://www.youtube.com/@sound_of_colours"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.youtube.com/@sound_of_colours"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pinterest"
        >
          <FaPinterestP />
        </a>
      </div>
    </footer>
  );
}
