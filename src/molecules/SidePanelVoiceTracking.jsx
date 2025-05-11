"use client";

import Dropdown from "@/molecules/Dropdown";
import ButtonCopilot from "@/atoms/ButtonCopilot";

function PlaylistItem({ time, text, radioCopilot }) {
  if (radioCopilot == true)
    return (
      <li className="bg-none border border-red-600 text-red-600 text-center flex justify-center px-2 py-1 rounded-sm ">
        <span>{"<RADIO COPILOT>"}</span>
      </li>
    );

  return (
    <li className="bg-bigBg px-2 py-1 flex gap-4 rounded-sm">
      <span className="text-[#FAAD17]">{time}</span>
      <span>{text}</span>
    </li>
  );
}

const playlistData = [
  { time: "08:12:43", text: "Morning Vibes Radio Intro" },
  { time: "09:24:16", text: "Sunrise Serenade" },
  { time: "10:45:59", text: "Chill Beats" },
  { time: "11:30:10", text: "Talk Show: Daily News" },
  { time: "12:05:47", text: "Upbeat Escape" },
  { time: "12:20:10", text: "Upbeat Escape", radioCopilot: true },
  { time: "14:18:22", text: "Acoustic Break" },
  { time: "15:35:33", text: "Guest Interview: Music Insights" },
  { time: "17:22:18", text: "Late Night Groove" },
  { time: "19:47:05", text: "Top Hits Countdown" },
  { time: "21:10:12", text: "Feel Good Anthem" },
];

export default function SidePanelVoiceTracking() {
  return (
    <div className="w-full">
      <Dropdown />
      <div className="flex gap-2 items-center mb-5">
        <ButtonCopilot text="09/28/2024 22:00" />
        <ButtonCopilot text="Import Log" />
      </div>

      <ul className="flex flex-col gap-2">
        {playlistData.map(({ time, text, radioCopilot }) => {
          return (
            <PlaylistItem
              key={time + text}
              time={time}
              text={text}
              radioCopilot={radioCopilot}
            />
          );
        })}
      </ul>
    </div>
  );
}
