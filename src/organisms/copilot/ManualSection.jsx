"use client";

import NewsInputSections from "@/molecules/NewsInputSections";
import useCopilotStore from "@/stores/useCopilotStore";

export default function ManualSection() {
  const isAutomaticMode = useCopilotStore((state) => state.isAutomaticMode);

  return (
    <div
      className={`${
        isAutomaticMode ? "hidden" : ""
      } w-[min(48rem,90%)] mx-auto`}
    >
      <ul className="w-full flex flex-col items-center gap-9 mx-auto mb-9">
        <NewsInputSections />
      </ul>
    </div>
  );
}
