import React from "react";
import Image from "next/image";

const ImageComponent = ({ num }) => {
  const imagePath = `/p${num}.jpeg`;

  return (
    <div id="center-image" className="m-16 group p-4">
      <span className="cursor-grabbing">
        <Image
          src={imagePath}
          width={200}
          height={500}
          alt={`Image ${num}`}
          className="group-hover:scale-110 transition duration-300 ease-in-out"
          priority={true}
        />
      </span>
    </div>
  );
};

export default ImageComponent;
