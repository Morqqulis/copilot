"use client";

import Image from "next/image";
import searchIcon from "@/assets/icons/search-icon.svg";
import playIcon from "@/assets/icons/play-icon.svg";
import exportIcon from "@/assets/icons/export-icon.svg";

export default function SidePanelNewsWeather() {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="border rounded-md flex items-center justify-between px-3">
        <input
          className="bg-transparent border-none !outline-none !shadow-none !ring-transparent"
          type="search"
          placeholder="Search audio clips here"
        />
        <Image src={searchIcon} alt="search" width={20} height={20} />
      </div>
      <div className="bg-bigBg flex items-center gap-5 px-5 py-2 rounded-md text-sm">
        <Image src={playIcon} alt="search" width={40} height={40} />
        <span>{"Request: Jenna > Bruno Mars Lady Gaga"}</span>
        <Image src={exportIcon} alt="search" width={30} height={30} />
      </div>
    </div>
  );
}
