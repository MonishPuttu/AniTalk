import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { StaticImageData } from "next/image";

const OBJECT_FIT_CLASS: Record<string, string> = {
  contain: "object-contain",
  cover: "object-cover",
  fill: "object-fill",
  none: "object-none",
  "scale-down": "object-scale-down",
};

interface ImageConfig {
  width?: number;
  height?: number;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  imageClass?: string;
}
interface Props {
  className?: string;
  translate?: string;
  image: string | StaticImageData;
  title: string;
  text: string;
  imageWidth?: number;
  imageHeight?: number;
  ImgClass?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  onClick?: () => void;
  imageConfig?: ImageConfig;
  bgColor?: string;
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
  bgColor,
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
      className={`relative group border border-white/10 shadow-lg rounded-xl
         hover:scale-[1.03] transition-all duration-300 cursor-pointer
         overflow-hidden text-white min-h-[300px] ${className}`}
      style={{ backgroundColor: bgColor || "#1a1a2e" }}
    >
      {/* Image with subtle glow/distinction */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at 25% 60%, rgba(255,255,255,0.15) 0%, transparent 70%)`,
          }}
        />
        <Image
          src={image}
          alt={title}
          width={finalConfig.width}
          height={finalConfig.height}
          className={`${finalConfig.ImgClass} ${OBJECT_FIT_CLASS[finalConfig.objectFit ?? 'cover']} drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]`}
          style={{ position: "absolute", filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.4))" }}
        />
      </div>

      {/* Text content */}
      <div
        className="absolute flex flex-col justify-between
        p-6 text-start pl-90 pt-20"
      >
        <h1 className="text-5xl font-bold drop-shadow-lg pb-2
          [text-shadow:_0_2px_12px_rgba(0,0,0,0.8)]">
          {title}
        </h1>
        <p
          className="text-sm md:text-base lg:text-lg drop-shadow-lg
          mt-2 pr-2 md:line-clamp-4 text-white/85
          [text-shadow:_0_1px_8px_rgba(0,0,0,0.6)]"
        >
          {text}
        </p>
      </div>

      {/* Try Now button */}
      <div className="absolute flex bottom-10 right-16 items-center justify-end
        gap-1 group-hover:gap-2 transition-all duration-300">
        <p className="text-2xl font-medium [text-shadow:_0_1px_8px_rgba(0,0,0,0.6)]">Try Now</p>
        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </div>
  );
};
