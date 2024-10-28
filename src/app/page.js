"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import React, { useState, } from "react";
import ImageComponent from "./components/ImageComp";
import Link from "next/link";
import { FaInstagram,FaFacebook,FaYoutube,FaPinterest } from "react-icons/fa";
import { Button } from "./components/ui/button";
import ImageCarousel from "./components/ImageCarousel";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import CustomEnquire from "./components/CustomEnquire";

export default function Home() {
  const [imageNum, setImageNum] = useState(52);
  
  const handleMainImage = (num) => {
    setImageNum(num);
  }; 

  return (
    <>

    <div className="">
        
        {/* <ScrollerAnim/> */}
        <div id="hero" className="m-2 flex flex-col md:flex-row">
          <div id="text-content" className="text-center flex flex-col m-4 p-4 basis-3/6">
            <div id="primary-text" className="m-2 p-2 text-2xl">
              Each painting is crafted with passion, <span className="font-semibold text-amber-300">Recraft</span> it just for yourself, tailored to your space while keeping its <span className="font-bold text-amber-300">Unique Charm</span>.
            </div>
            <div id="secondary-text" className="font-semibold flex flex-col md:flex-row justify-evenly md:mx-2 p-2">
              <div id="sec-text-content" className="text-xl">
                Feel free to reach out for custom inquiries!
              </div>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button className="m-4 p-2 md:m-0 font-semibold text-sm bg-[#FFEB00]" variant="outline" >
                    Enquire
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="h-max">
                    <DrawerHeader>
                      <DrawerTitle>Don&apos;t Worry, We Will Reach Out!</DrawerTitle>
                      <DrawerDescription>We prefer Whatsapp {'<3'}</DrawerDescription>
                    </DrawerHeader>
                    <CustomEnquire />
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
          <div id="image-carousel" className="m-4 p-4 basis-3/6">
            <ImageCarousel />
          </div>
        </div>
          <div id="selected-work" className="md:mx-16 mx-4 my-4 p-4 ">
            <div id="heading" className="flex pb-2 border-b-4">
                <div className="text-2xl md:text-4xl basis-2/3">
                  SELECTED WORK
                </div>
                <div className=" md:text-xl basis-1/3 text-right cursor-pointer transition-all duration-300 ease-in-out group">
                  <Link href='/Gallery'><span className="bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">VIEW ALL</span></Link>
                </div>
            </div>
            <div>
              <div id="image-showcase" className="flex flex-col items-center">
                <ImageComponent num={imageNum} />
                <div id="image-list" className="mx-auto p-4">
                  <div className="grid grid-rows-3 grid-flow-col sm:flex">
                    
                    {[50, 52 ,43,53, 51, 45].map((num) => (
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
            </div>
            <div id="aboutMeContentContainer" className="flex flex-col md:flex-row">
                <div id="headShot" className="m-4 p-4">
                    <Image 
                      src='/1.jpg'
                      alt="headshot"
                      width={1200}
                      height={300}
                    />
                </div>
                <div id="textContent" className="flex flex-col m-2 p-2">
                    <div id="para1" className="m-2 p-2">Shweta Tyagi is a dynamic force in the art world, well-known for her vivid and intensely emotional paintings close to nature that captivate audiences all over the world. Shweta was raised by a family that valued and supported her artistic abilities from a young age. She was born in the busy Indian metropolis of Delhi. She began by drawing her surroundings and experimenting with different mediums, her love of art eventually developed into a lifelong commitment to using color and form to explore the subtleties of nature.
                    </div>
                    <div id="para2" className="m-2 p-2">Political science master&apos;s degree from Delhi University. The occupation of a teacher. National athlete in gymnastics. Shweta Tyagi is a multifaceted all-arounder.
                    The artistic path of Shweta Tyagi is proof of the transforming and boundary-pushing potential of art. She celebrates the richness of life on earth one brushstroke at a time by inviting us to explore nature through the lens of her unique voice and unshakable determination.</div>
                    <div id="acheivements" className="flex flex-col text-xl">
                        
                        <div id="ach1" className="border-b-4 m-2 p-2 flex">
                          <div id="achTitle" className="basis-2/3 md:basis-1/2">Graduation in Humanities with Fine Arts</div>
                          <div id="achDate" className="text-right basis-1/3 md:basis-1/2">New Green Fields Public School,2000</div>
                        </div>
                        <div id="ach2" className="border-b-4 m-2 p-2 flex"> 
                          <div id="achTitle" className="basis-2/3 md:basis-1/2">B.A. Political Science (Honours)</div>
                          <div id="achDate" className="text-right basis-1/3 md:basis-1/2">Kamla Nehru College, Delhi University,2001-2003</div>
                        </div>
                        <div id="ach3" className="border-b-4 m-2 p-2 flex">
                          <div id="achTitle" className="basis-2/3 md:basis-1/2">M.A. Political Science </div>
                          <div id="achDate" className="text-right basis-1/3 md:basis-1/2">Kamala Nehru College, Delhi University,2004-2005</div>
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
                            <div id="title" className="underline text-2xl font-semibold">SOCIALS</div>
                            <div id="content" className="flex">
                              <div className="pr-2 py-2 "><Link aria-label="Instagram" href="https://www.youtube.com/@sound_of_colours"><FaInstagram /></Link></div>
                              <div className="px-2 py-2"><Link aria-label="Facebook" href="https://www.youtube.com/@sound_of_colours"><FaFacebook/></Link></div>
                              <div className="px-2 py-2"><Link aria-label="Youtube" href="https://www.youtube.com/@sound_of_colours"><FaYoutube/></Link></div>
                              <div className="px-2 py-2"><Link aria-label="Pinterest" href="https://www.youtube.com/@sound_of_colours"><FaPinterest/></Link></div>
                            </div>
                        </div>
                        <div id="email" className="basis-1/3 flex flex-col py-2 my-2 md:p-4 md:m-4">
                          <div id="title" className="underline text-2xl font-semibold">E-MAIL</div>
                          <div id="content" className="">contact.soundofcolours@gmail.com</div>
                        </div>
                        <div id="phone" className="basis-1/3 flex flex-col py-2 my-2 md:p-4 md:m-4">
                        <div id="title" className="underline text-2xl font-semibold">PHONE</div>
                        <div id="content" className="">+91 83023 86540</div>
                        </div>
                    </div>
            </div>
          </div>


      </div>
    </>
  )
}

