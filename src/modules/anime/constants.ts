import gojo from "../../../public/gojo.svg";
import madara from "../../../public/madarauchiha.svg";
import zerotwo from "../../../public/zerotwo.svg";
import { StaticImageData } from "next/image";

interface ImageConfig {
  width?: number;
  height?: number;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  imageClass?: string;
}

export interface AnimeCardData {
  id: number;
  image: string | StaticImageData;
  title: string;
  text: string;
  agentId: string;
  bgColor: string;
  imageConfig?: ImageConfig;
}

export const AnimeCards: AnimeCardData[] = [
  {
    id: 1,
    image: gojo,
    title: "Satoru Gojo",
    text: "The strongest sorcerer with limitless power and endless charm. Experience his playful confidence and unmatched wit in every conversation",
    agentId: "agent_5701k2d0nwk2fht98vpea0q2cymz",
    bgColor: "#1a1a2e",
    imageConfig: {
      width: 300,
      height: 300,
      objectFit: "cover",
      imageClass: "absolute bottom-0 left-12 top-18 scale-150",
    },
  },
  {
    id: 2,
    image: madara,
    title: "Madara Uchiha",
    text: "The legendary Ghost of the Uchiha - fierce, strategic, and unforgettable. Engage with one of anime's most iconic and powerful shinobi.",
    agentId: "agent_5701k2d0nwk2fht98vpea0q2cymz",
    bgColor: "#2a1215",
    imageConfig: {
      width: 300,
      height: 300,
      imageClass: "scale-200 bottom-0 left-2",
    },
  },
  {
    id: 3,
    image: zerotwo,
    title: "Zero Two",
    text: "The mysterious darling with horns and attitude. Chat with the flirty, unpredictable pilot who's as dangerous as she is captivating.",
    agentId: "agent_5701k2d0nwk2fht98vpea0q2cymz",
    bgColor: "#1f1520",
    imageConfig: {
      width: 300,
      height: 300,
      imageClass: "scale-135 ml-14 bottom-2",
    },
  },
];
