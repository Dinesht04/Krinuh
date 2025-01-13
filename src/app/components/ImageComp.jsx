import React from "react";
import Image from "next/image";

const ImageComponent = ({ num }) => {
  const imagePath = `/${num}.jpg`;

  return (
    <div id="center-image" className="m-16 group p-4">
      <span className="cursor-grabbing">
        <Image
          src={imagePath}
          width={400}
          height={1000}
          alt={`Image ${num}`}
          className="group-hover:scale-110 transition duration-300 ease-in-out"
          
          quality={100}
        />
      </span>
    </div>
  );
};

export default ImageComponent;
