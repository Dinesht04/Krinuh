"use client";

import { useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import Modal from "../Modal";
import { useMediaQuery } from "@/hooks/use-media-query";
import { CldImage } from "next-cloudinary";

interface ParallaxScrollProps {
  images: string[];
  className?: string;
}

export const ParallaxScroll = ({ images, className }: ParallaxScrollProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });

  const translateYValues = [
    useTransform(scrollYProgress, [0, 1], [0, -200]),
    useTransform(scrollYProgress, [0, 1], [0, 200]),
    useTransform(scrollYProgress, [0, 1], [0, -200]),
  ];

  const third = Math.ceil(images.length / 3);
  const imageChunks = [
    images.slice(0, third),
    images.slice(third, 2 * third),
    images.slice(2 * third),
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedSrc, setSelectedSrc] = useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleImageClick = useCallback((src: string) => {
    setSelectedSrc(src);
    console.log(src);
    setShowModal(true);
  }, []);

  const sharedImageClass =
    "hover:cursor-grab h-fit object-cover w-full object-left-top gap-10 !m-0 !p-0";

  return (
    <>
      <div
        className={cn("items-start overflow-y-auto w-full", className)}
        ref={gridRef}
      >
        <div className="md:grid sm:flex-col md:grid-cols-2 lg:grid-cols-3 items-start max-w-fit mx-auto gap-4 py-40 px-10">
          {imageChunks.map((chunk, columnIndex) => (
            <div className="grid gap-4 relative overflow-hidden" key={columnIndex}>
              {chunk.map((src, idx) => (
                <motion.div
                  key={`grid-${columnIndex}-${idx}`}
                  style={{ y: translateYValues[columnIndex] }}
                >
                  <CldImage
                    src={src}
                    className={sharedImageClass}
                    height="400"
                    width={columnIndex === 0 ? 300 : 400}
                    alt="thumbnail"
                    onClick={() => handleImageClick(src)}
                    quality={100}
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Modal
        isVisible={showModal}
        setIsVisible={setShowModal}
        isDesktop={isDesktop}
        src={selectedSrc}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};
