import React from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";

const ImageComponent = ({ src_public_id }) => {

  return (
    <div id="center-image" className="m-16 group p-4">
      <span className="cursor-grabbing">
        <CldImage
          src={src_public_id}
          width={400}
          height={1000}
          alt={src_public_id}
          className="group-hover:scale-110 transition duration-300 ease-in-out"
          quality={100}
        />
      </span>
    </div>
  );
};

export default ImageComponent;
