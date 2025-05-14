"use client";

import Dropdown from "@/molecules/Dropdown";
import { useEffect, useState } from "react";
import PlaylistItem from "@/atoms/PlaylistItem";
import axios from "axios";
import SpinnerLoader from "@/atoms/SpinnerLoader";
import useCopilotStore from "@/stores/useCopilotStore";
import { fetchNews } from "@/methods/getNewsSegmentScript";

export default function SidePanelNewsWeather() {
  const segmentStories = useCopilotStore((state) => state.segmentStories);
  const isLoadingSegmentStories = useCopilotStore(
    (state) => state.isLoadingSegmentStories
  );
  const updateRegion = useCopilotStore((state) => state.updateRegion);
  const selectedRegion = useCopilotStore((state) => state.selectedRegion);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    axios
      .get("https://copilot.radiostation.ai/api/countries")
      .then((response) => {
        setRegions(response.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <Dropdown
          dropDownValue={selectedRegion}
          label="Region"
          options={regions}
          updateDropdown={updateRegion}
        />
      </div>

      <button
        onClick={fetchNews}
        className="flex justify-center items-center gap-3 bg-cyan-600 hover:bg-cyan-700 mb-5 px-3 py-2 rounded-md w-full whitespace-nowrap"
      >
        Fetch News & Weather
        <SpinnerLoader
          className={
            isLoadingSegmentStories.news &&
            isLoadingSegmentStories.weather &&
            isLoadingSegmentStories.travel
              ? ""
              : "hidden"
          }
        />
      </button>

      <ul className="flex flex-col gap-4 text-white">
        {["news", "weather", "travel"].map((segmentName) => {
          return (
            <li key={segmentName} className="">
              <div className="flex gap-4 bg-bigBg mb-1 px-4 py-1 rounded-md text-center">
                <span className="mx-auto uppercase">{segmentName}</span>
              </div>
              <SpinnerLoader
                className={
                  isLoadingSegmentStories[segmentName]
                    ? "mx-auto w-6 mb-4"
                    : "hidden"
                }
              />
              <EmptyListPlaceholder
                segmentName={segmentName}
                segmentStories={segmentStories}
              />
              <DisplayNewsSegmentElements
                segmentName={segmentName}
                segmentStories={segmentStories}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function DisplayNewsSegmentElements({ segmentName, segmentStories }) {
  const newsTable = [];

  const newsSegment = segmentStories[segmentName];
  if (!newsSegment) return;
  newsSegment.map(({ content, selected }, index) => {
    newsTable.push(
      <PlaylistItem
        key={content}
        segmentName={segmentName}
        content={content}
        selected={selected}
        index={index}
      />
    );
  });

  return <ul className="flex flex-col gap-2 px-3">{newsTable}</ul>;
}

function EmptyListPlaceholder({ segmentName, segmentStories }) {
  if (segmentStories[segmentName]) return;
  return (
    <div className="flex flex-col items-center mx-auto mb-4 w-full text-gray-500 text-sm text-center">
      <span>fetch news to get scripts</span>
    </div>
  );
}
