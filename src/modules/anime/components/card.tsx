import Image from "next/image";

interface Props {
  className?: string;
  image: string;
  title: string;
  text: string;
  onClick?: () => void;
}

export const Card = ({ className, image, title, text, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`bg-accent-foreground flex items-center justify-center hover:bg-white
         text-white hover:text-black border shadow-md rounded-xl hover:scale-105
         transition-all duration-300 cursor-pointer overflow-hidden ${className}`}
    >
      <div className="flex-shrink-0">
        <Image
          src={image}
          alt={title}
          className="object-cover rounded-lg w-full h-auto"
        />
      </div>
      <div className="flex flex-col justify-center gap-2 p-4">
        <h1 className="text-xl md:text-3xl lg:text-6xl font-semibold truncate">
          {title}
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-right overflow-hidden line-clamp-3">
          {text}
        </p>
      </div>
    </div>
  );
};
