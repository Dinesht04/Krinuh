"use client";

import Image from "next/image";
import React, { useState } from "react";
import ImageComponent from "./Components/ImageComp";
import ScrollerAnim from "./Components/ScrollerAnim";
import Link from "next/link";


export default function Home() {
  const [imageNum, setImageNum] = useState(1);

  const handleMainImage = (num) => {
    setImageNum(num);
  };
  //effect colourflow
  //autoplay progress
  //auto-height
  //zoom
  //slidable nav for mobile
  return (
    <>
    <div className="bg-slate-00">
        
        <ScrollerAnim/>
          <div id="selected-work" className="md:mx-16 mx-4 my-4 p-4 ">
            <div id="heading" className="flex pb-2 border-b-4">
                <div className="text-2xl md:text-4xl basis-2/3">
                  SELECTED WORK
                </div>
                {/* <div className=" md:text-xl basis-1/3 text-right cursor-pointer transition-all duration-300 ease-in-out group">
                  <Link href='/Gallery'><span className="bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">VIEW ALL</span></Link>
                </div> */}
            </div>
            <div>
              <div id="image-showcase" className="flex flex-col items-center">
                <ImageComponent num={imageNum} />
                <div id="image-list" className="mx-auto p-4">
                  <div className="flex flex-wrap">
                    
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <Image
                        key={num}
                        onClick={() => handleMainImage(num)}
                        className="p-4 hover:transform hover:translate-y-4 hover:cursor-grab transition duration-300 ease-in-out"
                        src={`/${num}.jpg`}
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
                    
          <div id="about" className="md:mx-16 mx-4 my-4 p-4">
          <div id="headingAbout" className="flex border-b-4">
                <div className="text-2xl md:text-4xl pb-2 basis-2/3">
                    ABOUT ME
                </div>
                {/* <div className=" md:text-xl basis-1/3 text-right cursor-pointer transition-all duration-300 ease-in-out group">
                  <Link href='/Gallery'><span className="bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">READ MORE</span></Link>
                </div> */}
            </div>
            <div id="aboutMeContentContainer" className="flex flex-col md:flex-row">
                <div id="headShot" className="m-4 p-4">
                    <Image 
                      src='/1.jpg'
                      width={1200}
                      height={300}
                    />
                </div>
                <div id="textContent" className="flex flex-col m-2 p-2">
                    <div id="para1" className="m-2 p-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centur</div>
                    <div id="para2" className="m-2 p-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centur</div>
                    <div id="acheivements" className="flex flex-col text-xl">
                        <div id="ach1" className="border-b-4 m-2 p-2 flex"> 
                          <div id="achTitle" className="basis-2/3">Fight Club Winner</div>
                          <div id="achDate" className="text-right basis-1/3">January 2024</div>
                        </div>
                        <div id="ach2" className="border-b-4 m-2 p-2 flex">
                          <div id="achTitle" className="basis-2/3">Best Maasi of the Year</div>
                          <div id="achDate" className="text-right basis-1/3">March 2024</div>
                        </div>
                        <div id="ach3" className="border-b-4 m-2 p-2 flex">
                          <div id="achTitle" className="basis-2/3">Underground dog-fighting Ring Mastermind</div>
                          <div id="achDate" className="text-right basis-1/3">June 2024</div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          
          <div>
            <div id="contactHome" className="md:mx-16 mx-4 my-4 p-4 border-b-4 md:border-0">
                    <div id="headingContact" className="heading flex">
                        <div className="md:basis-1/3 text-2xl  md:text-7xl">REACH OUT TO ME</div>
                        <div className="md:basis-2/3"></div>
                    </div>
                    <div id="contactDetails" className="flex flex-col md:flex-row">
                        <div id="adress" className="basis-1/3 flex flex-col py-2 my-2 md:py-4 md:my-4">
                            <div id="title" className="underline text-2xl font-semibold">ADDRESS</div>
                            <div id="content" className="">idk bruh, like why do you wanna know my address, even I dont know maasi's address. That's lowkey crazy</div>
                        </div>
                        <div id="email" className="basis-1/3 flex flex-col py-2 my-2 md:p-4 md:m-4">
                          <div id="title" className="underline text-2xl font-semibold">E-MAIL</div>
                          <div id="content" className="">contact@soundofcolours.com</div>
                        </div>
                        <div id="phone" className="basis-1/3 flex flex-col py-2 my-2 md:p-4 md:m-4">
                        <div id="title" className="underline text-2xl font-semibold">PHONE</div>
                        <div id="content" className="">+91 7827521238</div>
                        </div>
                    </div>
            </div>
          </div>


      </div>
    </>
  )
}

