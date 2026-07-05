import React from "react";

export default function OurStorySection() {
  return (
    <section className="text-center bg-white px-8 pt-24 pb-20 relative overflow-hidden">
      <h2 className="font-script text-5xl sm:text-6xl text-krinuh-ink mb-4 mt-4">Our Story</h2>

      <img
        src="/dragonfly.png"
        alt=""
        aria-hidden="true"
        className="absolute top-5 left-4 h-7 opacity-20"
        style={{ transform: "rotate(90deg)" }}
      />
      <img
        src="/dragonfly.png"
        alt=""
        aria-hidden="true"
        className="absolute top-5 right-4 h-7 opacity-20"
        style={{ transform: "rotate(200deg)" }}
      />

      <p className="text-[15px] sm:text-base text-krinuh-text max-w-lg mx-auto leading-[1.9] relative z-10">
        KRINUH is the solo journey of Shweta Tyagi — a Jaipur artist who hand-paints every
        canvas and hand-makes every piece of jewellery herself, blending traditional craft
        with a quiet, modern eye.
      </p>

      <img
        src="/dragonfly.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-5 left-4 h-7 opacity-20"
        style={{ transform: "rotate(12deg)" }}
      />
      <img
        src="/dragonfly.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-5 right-4 h-7 opacity-20"
        style={{ transform: "rotate(260deg)" }}
      />
    </section>
  );
}
