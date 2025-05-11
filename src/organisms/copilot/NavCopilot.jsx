"use client";

import DropdownCopilot from "@/molecules/Dropdown";
import settingIcon from "@/assets/icons/settings-icon.svg";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import NewsPageNavTools from "@/molecules/NewsPageNavTools";
import useCopilotStore from "@/stores/useCopilotStore";

const tabsData = [
  { title: "voice tracking", value: "voice" },
  { title: "news, weather, travel", value: "news" },
  { title: "callers", value: "callers" },
];

export default function NavCopilot() {
  const screen = useCopilotStore((state) => state.screen);
  const updateMode = useCopilotStore((state) => state.updateMode);
  const [voiceOptions, setVoiceOptions] = useState([]);

  const voice = useCopilotStore((state) => state.voice);
  const setVoice = useCopilotStore((state) => state.setVoice);
  const selectedRegion = useCopilotStore((state) => state.selectedRegion);

  function screenChange(value) {
    updateMode(value);
  }

  useEffect(() => {
    const category =
      screen == "voice"
        ? "voicetracking"
        : screen == "callers"
        ? "caller"
        : screen;
    const country = screen == "news" ? `&country=${selectedRegion}` : "";
    axios
      .get(
        `https://copilot.radiostation.ai/api/voices?category=${category}${country}`
      )
      .then((response) => {
        let newVoices = response.data.data.map(({ voiceID, voice_name }) => ({
          name: voice_name,
          code: voiceID,
        }));
        setVoice(newVoices[0].code);
        setVoiceOptions(newVoices);
      })
      .catch((error) => console.error(error));
  }, [selectedRegion]);

  return (
    <nav className="flex flex-col justify-start w-full mb-14">
      <div className="flex justify-between items-center w-full mb-5">
        <ul className="flex gap-5 uppercase">
          {tabsData.map(({ title, value }, index) => {
            return (
              <li
                key={title}
                onClick={() => screenChange(value)}
                className={`border-b-2 py-3 px-2 border-blue-400 cursor-pointer hover:opacity-100 ${
                  value == screen
                    ? "opacity-100 border-opacity-100"
                    : "opacity-80 border-opacity-0"
                }`}
              >
                {title}
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-6">
          <DropdownCopilot
            dropDownValue={voice}
            label="Voices"
            options={voiceOptions}
            updateDropdown={setVoice}
          />

          <button className="w-10 shrink-0">
            <Image
              className=" text-white"
              src={settingIcon}
              alt="settings"
              width={30}
              height={30}
            />
          </button>
        </div>
      </div>
      <NewsPageNavTools />
    </nav>
  );
}
