"use client";

import { Card } from "./card";
import { AnimeCards } from "../constants";
import { useRouter } from "next/navigation";
import { Plus, Sparkles } from "lucide-react";

export const AnimeSelect = () => {
  const router = useRouter();

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-8">
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {AnimeCards.map((item) => (
          <Card
            key={item.id}
            image={item.image}
            text={item.text}
            title={item.title}
            imageConfig={item.imageConfig}
            bgColor={item.bgColor}
            onClick={() => router.push(`/anime/${item.id}`)}
            className="w-full h-full"
          />
        ))}

        {/* Create Your Own Character card */}
        <div
          onClick={() => router.push("/agents")}
          className="relative group rounded-xl cursor-pointer overflow-hidden
            border-2 border-dashed border-white/20 hover:border-white/40
            hover:scale-[1.03] transition-all duration-300
            flex flex-col items-center justify-center gap-4 p-8
            w-full h-full min-h-[200px]"
          style={{
            background: "linear-gradient(135deg, #0f0f1a 0%, #1a0f2e 50%, #0f1a2e 100%)",
          }}
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/30
              flex items-center justify-center
              group-hover:border-white/60 group-hover:scale-110
              transition-all duration-300">
              <Plus className="w-10 h-10 text-white/50 group-hover:text-white/80 transition-colors duration-300" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-yellow-400/70
              group-hover:text-yellow-400 group-hover:animate-pulse transition-colors duration-300" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white/80
              group-hover:text-white transition-colors duration-300">
              Create Your Own
            </h2>
            <p className="text-sm md:text-base text-white/40 mt-2
              group-hover:text-white/60 transition-colors duration-300 max-w-xs">
              Build a custom anime character with your own personality and voice
            </p>
          </div>
          <div className="flex items-center gap-1 text-white/40
            group-hover:text-white/70 group-hover:gap-2 transition-all duration-300 mt-2">
            <p className="text-lg font-medium">Get Started</p>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
