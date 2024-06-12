"use client";

import { Limelight } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ImageComponent from "./Components/ImageComp";

const limelight = Limelight({
  preload: false,
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  const [imageNum, setImageNum] = useState(1);

  const handleMainImage = (num) => {
    setImageNum(num);
  };

  return (
    <div className="">
      <div className={` ${limelight.className} `}>
        <div className=" text-center text-4xl mt-16 p-2 ">Shweta Tyagi</div>

        <nav className="text-2xl flex text-center justify-center flex-wrap">
          <div className="m-4 px-4 py-2 cursor-pointer transition-all duration-300 ease-in-out group">
            <Link href="/">
              <span className="bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                HOME
              </span>
            </Link>
          </div>
          <div className="m-4 px-4 py-2 cursor-pointer transition-all duration-300 ease-in-out group">
            <Link href="/Opus">
              <span className="bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                OPUS
              </span>
            </Link>
          </div>
          <div className="m-4 p-2 cursor-pointer transition-all duration-300 ease-in-out group">
            <Link href="/Contact">
              <span className="bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                CONTACT
              </span>
            </Link>
          </div>
        </nav>
        <div id="image-showcase" className="flex flex-col items-center">
          <ImageComponent num={imageNum} />
          <div id="image-list" className="m-4 p-4">
            <div className="flex flex-wrap">
              {/* use map fucntion  --> */}
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <Image
                  key={num}
                  onClick={() => handleMainImage(num)}
                  className="p-4 hover:transform hover:translate-y-4 hover:cursor-grab transition duration-300 ease-in-out"
                  src={`/p${num}.jpeg`}
                  width={100}
                  height={100}
                  alt={`Thumbnail ${num}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
