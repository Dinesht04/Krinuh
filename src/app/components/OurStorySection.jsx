import React from "react";

export default function OurStorySection() {
  return (
    <section className="bg-white text-center px-6 py-12 relative overflow-hidden">
      <h2 className="text-3xl font-cursive font-semibold mb-6">Our Story</h2>

      {/* Dragonflies on both sides */}
      <img
        src="dragonfly.svg"
        alt=""
        className=" sm:block absolute left-0 top-16 h-6 opacity-20"
        style={{ transform: "rotate(0deg)" }}
      />
      <img
        src="dragonfly.svg"
        alt=""
        className=" sm:block absolute left-0 top-40 h-6 opacity-20"
        style={{ transform: "rotate(100deg)" }}
      />
      <img
        src="dragonfly.svg"
        alt=""
        className="sm:block absolute right-0 top-16 h-6 opacity-20"
        style={{ transform: "rotate(10deg)" }}
      />
      <img
        src="dragonfly.svg"
        alt=""
        className=" sm:block absolute right-0 top-40 h-6 opacity-20"
        style={{ transform: "rotate(200deg)" }}
      />
      <img
        src="dragonfly.svg"
        alt=""
        className=" sm:block absolute left-0 top-64 h-6 opacity-20"
        style={{ transform: "rotate(240deg)" }}
      />
      <img
        src="dragonfly.svg"
        alt=""
        className=" sm:block absolute right-0 top-64 h-6 opacity-20"
        style={{ transform: "rotate(180deg)" }}
      />

      <p className="text-gray-700 max-w-md mx-auto leading-relaxed z-10 relative">
        KRINUH brings you a line of handcrafted accessories combining traditional
        craftsmanship with a modern aesthetic and a shared passion for innovation
        and design. Founded by Shweta Tyagi in Jaipur, KRINUH is a solo journey
        of artistry, where every piece of jewelry is lovingly handmade by Shweta
        herself.
      </p>
      <button className="mt-8 bg-[#414141] text-white px-6 py-2 font-semibold tracking-wide z-10 relative">
        LEARN MORE
      </button>
    </section>
  );
}
