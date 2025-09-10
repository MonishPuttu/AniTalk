import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface ImageConfig {
  width?: number;
  height?: number;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  imageClass?: string;
}
interface Props {
  className?: string;
  translate?: string;
  image: string;
  title: string;
  text: string;
  imageWidth?: number;
  imageHeight?: number;
  ImgClass?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  onClick?: () => void;
  imageConfig?: ImageConfig;
}

export const Card = ({
  className,
  image,
  imageWidth,
  imageHeight,
  title,
  ImgClass,
  objectFit,
  imageConfig,
  text,
  onClick,
}: Props) => {
  const finalConfig = {
    width: imageConfig?.width || imageWidth || 300,
    height: imageConfig?.height || imageHeight || 300,
    objectFit: imageConfig?.objectFit || objectFit || "cover",
    ImgClass: imageConfig?.imageClass || ImgClass || "",
  };
  return (
    <div
      onClick={onClick}
      className={`relative bg-accent-foreground hover:bg-white
          border shadow-md rounded-xl hover:scale-105
         transition-transform duration-300 cursor-pointer 
         overflow-hidden gap-x-6 text-white hover:text-black 
         ${className}`}
    >
      <Image
        src={image}
        alt={title}
        width={finalConfig.width}
        height={finalConfig.height}
        className={` 
          object-${finalConfig.objectFit} ${finalConfig.ImgClass}`}
        style={{ position: "absolute" }}
      />

      <div
        className="absolute flex flex-col justify-between
      p-6 text-start pl-90 pt-20"
      >
        <h1 className="text-5xl font-semibold drop-shadow-md pb-2">{title}</h1>
        <p
          className="text-sm md:text-base lg:text-lg drop-shadow-md
         mt-2 pr-2 md:line-clamp-4"
        >
          {text}
        </p>
      </div>
      <div className="absolute flex bottom-10 right-16 items-center justify-end">
        <p className="text-2xl">Try Now</p>
        <ChevronRight />
      </div>
    </div>
  );
};
