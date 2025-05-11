"use client";

import exportIcon from "@/assets/icons/export-icon.svg";
import Image from "next/image";
import { useState } from "react";
import ManualAudioSection from "@/molecules/ManualAudioSection";
import enhanceNewsSegmentScript from "@/methods/enhanceNewsSegmentScript";
import SpinnerLoader from "@/atoms/SpinnerLoader";
import saveIcon from "@/assets/icons/save-icon.svg";
import exportAudioToCloud from "@/methods/exportAudioToCloud";
import exportImportAudio from "@/methods/exportImportAudio";
import useCopilotStore from "@/stores/useCopilotStore";

export default function NewsInputSections() {
  const segmentStories = useCopilotStore((state) => state.segmentStories);
  const updateSelectedStories = useCopilotStore(
    (state) => state.updateSelectedStories
  );
  const [isLoadingSegment, setIsLoadingSegment] = useState({
    news: false,
    weather: false,
    travel: false,
  });

  function generateNewsHandle(segmentName) {
    const newsArray = segmentStories[segmentName];
    if (!newsArray) return;
    if (segmentName == "travel") {
      updateSelectedStories("travel", 0, {
        ...newsArray[0],
        enhancedContent: newsArray[0].content,
      });
      return;
    }
    for (let i = 0; i < newsArray.length; i++) {
      enhanceNewsSegmentScript(
        segmentName,
        { story: newsArray[i].content },
        (segmentName, enhancedContent) => {
          const newStory = {
            ...segmentStories[segmentName][i],
            enhancedContent: enhancedContent,
          };
          updateSelectedStories(segmentName, i, newStory);
        },
        (segmentName, value) => {
          setIsLoadingSegment((prev) => {
            prev[segmentName] = value;
            return { ...prev };
          });
        }
      );
    }
  }

  return (
    <>
      {/* NEWS SECTION */}
      <li className="w-full">
        <button
          className="flex items-center justify-center gap-2 px-3 text-blue-400 border hover:text-blue-200 border-blue-600 hover:border-blue-400 rounded-md w-full py-2 uppercase font-medium"
          onClick={() => generateNewsHandle("news")}
        >
          generate News
          <SpinnerLoader className={isLoadingSegment["news"] ? "" : "hidden"} />
        </button>
      </li>
      <li className="w-full mx-auto">
        <ManualAudioSection index={0} segmentName={"intro"} />
      </li>
      <GenerateSegmentAreas segmentName={"news"} />
      <li className="w-full mx-auto">
        <ManualAudioSection index={0} segmentName={"outro"} />
      </li>
      <ExportDownloadBtns title={"news"} />

      {/* WEATHER SECTION */}

      <li className="w-full">
        <button
          className="flex items-center justify-center gap-2 px-3 text-blue-400 border hover:text-blue-200 border-blue-600 hover:border-blue-400 rounded-md w-full py-2 uppercase font-medium"
          onClick={() => generateNewsHandle("weather")}
        >
          generate Weather
          <SpinnerLoader
            className={isLoadingSegment["weather"] ? "" : "hidden"}
          />
        </button>
      </li>
      <GenerateSegmentAreas segmentName={"weather"} />
      <ExportDownloadBtns title={"weather"} />

      {/* TRAVEL SECTION */}
      <li className="w-full">
        <button
          className="flex items-center justify-center gap-2 px-3 text-blue-400 border hover:text-blue-200 border-blue-600 hover:border-blue-400 rounded-md w-full py-2 uppercase font-medium"
          onClick={() => generateNewsHandle("travel")}
        >
          generate travel
          <SpinnerLoader
            className={isLoadingSegment["travel"] ? "" : "hidden"}
          />
        </button>
      </li>
      <GenerateSegmentAreas segmentName={"travel"} />
      <ExportDownloadBtns title={"travel"} />
    </>
  );
}

function GenerateSegmentAreas({ segmentName }) {
  const segmentStories = useCopilotStore((state) => state.segmentStories);
  const segmentDataArray = segmentStories[segmentName];
  if (!segmentDataArray) return;
  const segmentHtmlElements = [];
  for (let i = 0; i < segmentDataArray.length; i++) {
    const { content, selected, enhancedContent } = segmentDataArray[i];
    if (!enhancedContent || !selected) continue;
    segmentHtmlElements.push(
      <li key={content} className="w-full mx-auto">
        <ManualAudioSection index={i} segmentName={segmentName} />
      </li>
    );
  }
  return segmentHtmlElements;
}

function ExportDownloadBtns({ title }) {
  const [isLoading, setIsLoading] = useState({
    download: false,
    export: false,
  });
  const segmentStories = useCopilotStore((state) => state.segmentStories);
  const voice = useCopilotStore((state) => state.voice);
  const selectedRegion = useCopilotStore((state) => state.selectedRegion);
  const segmentDataArray = segmentStories[title];
  if (!segmentDataArray) return;

  let mergedContents = [];
  if (title == "news") {
    mergedContents.push(segmentStories["intro"][0].enhancedContent);
  }
  for (let i = 0; i < segmentDataArray.length; i++) {
    const enhancedContent = segmentDataArray[i].enhancedContent;
    if (!enhancedContent || !segmentDataArray[i].selected) continue;
    mergedContents.push(enhancedContent);
  }
  if (title == "news")
    mergedContents.push(segmentStories["outro"][0].enhancedContent);
  if (title == "news" && mergedContents.length < 3) return;
  if (!mergedContents.length) return;
  mergedContents = mergedContents.join("\n");

  const exportUploadBtnsData = [
    {
      btnText: "upload to cloud",
      label: "export",
      icon: exportIcon,
      clickHandle: () => {
        exportAudioToCloud(
          title,
          {
            location_code: selectedRegion,
            voice: voice,
            script: mergedContents,
          },
          () => {},
          setIsLoading
        );
      },
    },
    {
      btnText: "export",
      label: "download",
      icon: saveIcon,
      clickHandle: () => {
        exportImportAudio(
          "download",
          {
            location: "Norway",
            service: title,
            script: mergedContents,
          },
          (value) => {
            setIsLoading((prev) => {
              return { ...prev, download: value };
            });
          }
        );
      },
    },
  ];
  return (
    <div className={`flex w-full items-center gap-2 mt-3`}>
      {exportUploadBtnsData.map(({ btnText, clickHandle, icon, label }) => {
        return (
          <button
            key={btnText}
            onClick={() => clickHandle(title)}
            className="w-full whitespace-nowrap uppercase border border-blue-700 rounded-md px-9 py-3 flex gap-2 items-center justify-center"
          >
            <Image src={icon} alt="mic logo" width={15} height={15} />
            {btnText}
            <SpinnerLoader className={isLoading[label] ? "" : "hidden"} />
          </button>
        );
      })}
    </div>
  );
}
