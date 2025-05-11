"use client";

import checkedIcon from "@/assets/icons/checked-icon.svg";
import uncheckedIcon from "@/assets/icons/unchecked-icon.svg";
import Image from "next/image";
import truncateText from "@/methods/truncateText";
import useCopilotStore from "@/stores/useCopilotStore";

export default function PlaylistItem({
  content,
  selected,
  segmentName,
  index,
}) {
  const updateSelectedStories = useCopilotStore(
    (state) => state.updateSelectedStories
  );
  const segmentStories = useCopilotStore((state) => state.segmentStories);

  function handleClick() {
    const newStory = {
      ...segmentStories[segmentName][index],
      selected: !selected,
    };
    updateSelectedStories(segmentName, index, newStory);
  }

  return (
    <li
      className="flex items-start gap-4 cursor-pointer hover:text-slate-300"
      onClick={handleClick}
    >
      {
        <Image
          className="w-5 shrink-0 pt-2"
          src={selected ? checkedIcon : uncheckedIcon}
          alt="check mark"
          width={100}
          height={100}
        />
      }
      <span>{truncateText(content, 100)}</span>
    </li>
  );
}
