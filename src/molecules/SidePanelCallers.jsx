"use client";

import Image from "next/image";
import searchIcon from "@/assets/icons/search-icon.svg";
import playIcon from "@/assets/icons/play-icon.svg";
import exportIcon from "@/assets/icons/export-icon.svg";

export default function SidePanelNewsWeather() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center px-3 border rounded-md">
        <input
          className="bg-transparent !shadow-none border-none !outline-none !ring-transparent"
          type="search"
          placeholder="Search audio clips here"
        />
        <Image src={searchIcon} alt="search" width={20} height={20} />
      </div>
      <div className="flex items-center gap-5 bg-bigBg px-5 py-2 rounded-md text-sm">
        <Image src={playIcon} alt="search" width={40} height={40} />
        <span className={`text-white`}>{"Request: Jenna > Bruno Mars Lady Gaga"}</span>
        <Image src={exportIcon} alt="search" width={30} height={30} />
      </div>
    </div>
  );
}
