"use client";

import exportIcon from "@/assets/icons/export-icon.svg"
import saveIcon from "@/assets/icons/save-icon.svg"
import SpinnerLoader from "@/atoms/SpinnerLoader"
import enhanceNewsSegmentScript from "@/methods/enhanceNewsSegmentScript"
import exportAudioToCloud from "@/methods/exportAudioToCloud"
import exportImportAudio from "@/methods/exportImportAudio"
import ManualAudioSection from "@/molecules/ManualAudioSection"
import useCopilotStore from "@/stores/useCopilotStore"
import { getApiCountryCode, getLanguageForCountry } from "@/utils/countryUtils"
import Image from "next/image"
import { useState } from "react"

export default function NewsInputSections() {
  const segmentStories = useCopilotStore((state) => state.segmentStories);
  const updateSelectedStories = useCopilotStore(
    (state) => state.updateSelectedStories
  );
  const selectedRegion = useCopilotStore((state) => state.selectedRegion);
  const [isLoadingSegment, setIsLoadingSegment] = useState({
    news: false,
    weather: false,
    travel: false,
  });

  function generateNewsHandle(segmentName) {
    const newsArray = segmentStories[segmentName];
    if (!newsArray) return;
    
    // Получаем язык на основе выбранного региона
    const countryCode = getApiCountryCode(selectedRegion);
    const language = getLanguageForCountry(countryCode);
    
    console.log(`Generating ${segmentName} in language: ${language}, region: ${selectedRegion}`);
    
    if (segmentName == "travel") {
      updateSelectedStories("travel", 0, {
        ...newsArray[0],
        enhancedContent: newsArray[0].content,
      });
      return;
    }
    
    // Для сегмента weather просто копируем контент в enhancedContent
    if (segmentName === "weather") {
      setIsLoadingSegment((prev) => ({
        ...prev,
        [segmentName]: true
      }));
      
      // Небольшая задержка для имитации загрузки
      setTimeout(() => {
        updateSelectedStories(segmentName, 0, {
          ...newsArray[0],
          enhancedContent: newsArray[0].content,
        });
        
        setIsLoadingSegment((prev) => ({
          ...prev,
          [segmentName]: false
        }));
      }, 500);
      
      return;
    }
    
    // Для новостей используем улучшение контента через API
    for (let i = 0; i < newsArray.length; i++) {
      enhanceNewsSegmentScript(
        segmentName,
        { 
          story: newsArray[i].content,
          language: language  // Передаем выбранный язык в API
        },
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
          className="flex justify-center items-center gap-2 px-3 py-2 border border-blue-600 hover:border-blue-400 rounded-md w-full font-medium text-blue-400 hover:text-blue-200 uppercase"
          onClick={() => generateNewsHandle("news")}
        >
          generate News
          <SpinnerLoader className={isLoadingSegment["news"] ? "" : "hidden"} />
        </button>
      </li>
      <li className="mx-auto w-full">
        <ManualAudioSection index={0} segmentName={"intro"} />
      </li>
      <GenerateSegmentAreas segmentName={"news"} />
      <li className="mx-auto w-full">
        <ManualAudioSection index={0} segmentName={"outro"} />
      </li>
      <ExportDownloadBtns title={"news"} />

      {/* WEATHER SECTION */}

      <li className="w-full">
        <button
          className="flex justify-center items-center gap-2 px-3 py-2 border border-blue-600 hover:border-blue-400 rounded-md w-full font-medium text-blue-400 hover:text-blue-200 uppercase"
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
          className="flex justify-center items-center gap-2 px-3 py-2 border border-blue-600 hover:border-blue-400 rounded-md w-full font-medium text-blue-400 hover:text-blue-200 uppercase"
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
      <li key={content} className="mx-auto w-full">
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
    <div className={`flex w-full items-center gap-2 mt-3 text-white`}>
      {exportUploadBtnsData.map(({ btnText, clickHandle, icon, label }) => {
        return (
          <button
            key={btnText}
            onClick={() => clickHandle(title)}
            className="flex justify-center items-center gap-2 px-9 py-3 border border-blue-700 rounded-md w-full uppercase whitespace-nowrap"
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
