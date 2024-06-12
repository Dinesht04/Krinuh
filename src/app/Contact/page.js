"use client"

import { Limelight } from "next/font/google";
import Image from "next/image";
import Link from "next/link";


const limelight = Limelight(
  {
    preload: false,
    subsets:['latin'],
    weight:['400']
  }
);

const blogs = 
    [
        {
            "title":"abc",
            "content":"xyz",
            "metadata":"abc"
        },
        {
            "title":"abc",
            "content":"xyz",
            "metadata":"sdfs"
        }

    ]



export default function Home() {


  const handleMainImage = (num) =>{
    const imageElement = document.getElementById('center-image');

    // Clear any existing image content
    imageElement.innerHTML = '';
  
    // Construct the image path based on the passed number
    const imagePath = `/p${num}.jpeg`; // Assuming image names follow the format p<num>.jpeg
  
    // Create the image element with dynamic attributes
    const image = document.createElement('img');
    image.src = imagePath;
    image.width = 200;
    image.height = 500;
    image.alt = "bruh"
    image.className = "group-hover:scale-110 transition duration-300 ease-in-out"

    // Create a container element (optional for styling)
    const container = document.createElement('span');
    container.className = 'cursor-grabbing'; // Add any desired class names here
  
    // Append the image to the container (optional)
    container.appendChild(image);
  
    // Append the container (or directly append the image) to the center-image div
    imageElement.appendChild(container); // Or imageElement.appendChild(image);
  }

  return (
    <div className="">
    <div className={` ${limelight.className} `}>
      <div className=" text-center text-4xl mt-16 p-2 ">
        Shweta Tyagi
      </div>
      
      <nav className="text-2xl flex text-center justify-center flex-wrap">
        <div className="m-4 px-4 py-2 cursor-pointer transition-all duration-300 ease-in-out group"> 
          <Link href='/'> <span className="bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out" >HOME</span></Link>
        </div>
        <div className="m-4 px-4 py-2 cursor-help transition-all duration-300 ease-in-out group"> 
          <span className=" underline S" >OPUS</span>
        </div>
        <div className="m-4 p-4 cursor-pointer transition-all duration-300 ease-in-out group"> 
        <Link href='/About'>  <span className="bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out" >ABOUT</span></Link>
        </div>
        <div className="m-4 p-2 cursor-pointer transition-all duration-300 ease-in-out group"> 
        <Link href='/Contact'>  <span className="bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out" >CONTACT</span></Link>
        </div>
      </nav>


     </div>
    </div>
  );
}
