"use client";

import Image from "next/image";
import React, { useState } from "react";
import ImageComponent from "./Components/ImageComp";


export default function Home() {
  const [imageNum, setImageNum] = useState(1);

  const handleMainImage = (num) => {
    setImageNum(num);
  };

  return (
    <>
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
      </>
  )
}

