"use client";

import { Card } from "./card";
import { AnimeCards } from "../constants";
import { useRouter } from "next/navigation";

export const AnimeSelect = () => {
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/anime");
  };

  return (
    <div className="h-full w-full overflow-hidden p-4 md:p-6 lg:p-8">
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {AnimeCards.map((item) => (
          <Card
            key={item.id}
            image={item.image}
            text={item.text}
            title={item.title}
            imageConfig={item.imageConfig}
            onClick={handleOnClick}
            className="w-full h-full"
          />
        ))}
      </div>
    </div>
  );
};
