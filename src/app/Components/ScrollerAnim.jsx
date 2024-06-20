"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Image from "next/image";
 
const ScrollerAnim = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              EXPLORE <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Emotive Creations
              </span> <br/>
              
            </h1>
          </>
        }
      >
        <Image
          src={'/x1.jpg'}
          alt="hero"
          height={300}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
 
export default ScrollerAnim;
