"use client";

import yellowMicIcon from "@/assets/icons/yellow-mic-icon.svg";
import editIcon from "@/assets/icons/edit-icon.svg";
import Image from "next/image";
import AudioPlayer from "@/molecules/AudioPlayer";
import { useState } from "react";
import ScreenWrapper from "./ScreenWrapper";

const textAreaEditButtons = [
  {
    icon: editIcon,
    title: "edit",
  },
  {
    icon: yellowMicIcon,
    title: "mic",
  },
];

export default function VoicePage() {
  const [previous, setPrevious] = useState({ title: "", artist: "" });
  const [follow, setFollow] = useState({ title: "", artist: "" });
  const [voice, setVoice] = useState("ZYU3o0m4ibrmH8lXRMon");

  function update(key, value) {
    if (key === "previous") {
      setPrevious(value);
    } else if (key === "follow") {
      setFollow(value);
    }
  }

  return (
    <>
      {/* <StoriesContext.Provider value={{ voice, setVoice }}> */}
      <ScreenWrapper>
        <div className="w-[min(48rem,90%)] mx-auto flex flex-col items-start gap-6">
          <div className="flex items-center justify-between w-full gap-5">
            {Song(previous.title, previous.artist)}
            <button className="whitespace-nowrap border-2 text-blue-400 uppercase border-blue-400 bg-transparent rounded-lg px-7 py-2">
              generate link
            </button>
          </div>
          <div className="w-full border border-red-600 rounded-lg bg-sidePanel p-5 pb-6">
            <textarea
              className="placeholder:text-opacity-80 w-full bg-transparent resize-none border-none !shadow-none !outline-none !ring-transparent"
              name=""
              id=""
              cols="30"
              rows="6"
              placeholder="write something..."
            ></textarea>
            <ul className="flex items-center gap-4">
              {textAreaEditButtons.map(({ icon, title }) => {
                const iconSize = 20;
                return (
                  <li key={title}>
                    <button className={`bg-bigBg rounded-full px-3 py-2`}>
                      <Image
                        src={icon}
                        alt={title}
                        width={iconSize}
                        height={iconSize}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <AudioPlayer />
          {Song(follow.title, follow.artist)}
          <button className="bg-cyan-700 w-full text-center uppercase py-2 rounded-lg">
            export audio
          </button>
        </div>
      </ScreenWrapper>
      {/* </StoriesContext.Provider> */}
    </>
  );
}

function Song(title, artist) {
  return (
    <div className="pl-4 bg-transparent w-full text-gray-400 font-medium capitalize cursor-default">
      {`${title || "title"} - ${artist || "artist"}`}
    </div>
  );
}
