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
    <div className="h-screen w-screen overflow-hidden">
      <div className="h-full w-full p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-full">
          {AnimeCards.map((anime) => (
            <Card
              key={anime.id}
              image={anime.image}
              text={anime.text}
              title={anime.title}
              onClick={handleOnClick}
              className="h-full min-h-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
