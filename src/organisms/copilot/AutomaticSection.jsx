"use client";

import AudioPlayer from "@/molecules/AudioPlayer";
import micIcon from "@/assets/icons/mic-icon.svg";
import saveIcon from "@/assets/icons/save-icon.svg";
import exportIcon from "@/assets/icons/export-icon.svg";
import Image from "next/image";
import { useState } from "react";
import generateAutomaticAudioReport from "@/methods/generateAutomaticAudioReport";
import SpinnerLoader from "@/atoms/SpinnerLoader";
import CountdownTimer from "@/atoms/CountdownTimer";
import downloadAudioFile from "@/methods/downloadAudioFile";
import toast from "react-hot-toast";
import useCopilotStore from "@/stores/useCopilotStore";

const segmentsDataIntitialState = {
  news: {
    audioUrl: null,
    isLoadingAudioUrl: false,
    isLoadingDownloadAudio: false,
    isLoadingExportAudio: false,
  },
  weather: {
    audioUrl: null,
    isLoadingAudioUrl: false,
    isLoadingDownloadAudio: false,
    isLoadingExportAudio: false,
  },
  travel: {
    audioUrl: null,
    isLoadingAudioUrl: false,
    isLoadingDownloadAudio: false,
    isLoadingExportAudio: false,
  },
};

export default function AutomaticSection() {
  const voice = useCopilotStore((state) => state.voice);
  const selectedRegion = useCopilotStore((state) => state.selectedRegion);
  const segmentStories = useCopilotStore((state) => state.segmentStories);
  const isAutomaticMode = useCopilotStore((state) => state.isAutomaticMode);
  const [segmentsData, setSegmentsData] = useState(segmentsDataIntitialState);

  const automaticSections = [
    {
      title: "news",
      clickHandle: () => {
        getAudioReport("news");
      },
    },
    {
      title: "weather",
      clickHandle: () => {
        getAudioReport("weather");
      },
    },
    {
      title: "travel",
      clickHandle: () => {
        getAudioReport("travel");
      },
    },
  ];

  const exportUploadBtnsData = [
    {
      btnText: "upload to cloud",
      icon: exportIcon,
      clickHandle: (segmentName) => {
        console.log(segmentsData[segmentName].audioUrl);
        toast.success("successfully uploaded to cloud");
      },
    },
    {
      btnText: "export",
      icon: saveIcon,
      clickHandle: (segmentName) => {
        downloadAudioFile(segmentsData[segmentName].audioUrl, (value) => {
          setSegmentsData((prev) => {
            prev[segmentName].isLoadingDownloadAudio = value;
            return { ...prev };
          });
        });
      },
    },
  ];

  function getAudioReport(segmentName) {
    generateAutomaticAudioReport(
      segmentName,
      {
        voice_code: voice,
        location_code: selectedRegion,
        intro: segmentStories.intro[0].content,
      },
      (audioUrl) => {
        setSegmentsData((prev) => {
          prev[segmentName].audioUrl = audioUrl;
          return { ...prev };
        });
      },
      (value) => {
        setSegmentsData((prev) => {
          prev[segmentName].isLoadingAudioUrl = value;
          return { ...prev };
        });
      }
    );
  }

  return (
    <div
      className={`${
        !isAutomaticMode ? "hidden" : ""
      } w-[min(48rem,90%)] mx-auto`}
    >
      <ul className="w-full flex flex-col items-center gap-9 mx-auto mb-9">
        {automaticSections.map(({ title, clickHandle }) => {
          return (
            <li key={title} className="w-full mx-auto">
              <div className="w-full">
                <div className="grid items-center grid-cols-3 mb-4 uppercase">
                  <h2>{title}</h2>
                  <CountdownTimer
                    generateHandle={clickHandle}
                    segmentName={title}
                  />
                  <button
                    onClick={clickHandle}
                    className="border uppercase whitespace-nowrap border-blue-700 rounded-md px-9 py-3 flex gap-2 items-center justify-center"
                  >
                    <Image
                      src={micIcon}
                      alt="mic logo"
                      width={15}
                      height={15}
                    />
                    GENERATE {title}
                    <SpinnerLoader
                      className={
                        segmentsData[title].isLoadingAudioUrl ? "" : "hidden"
                      }
                    />
                  </button>
                </div>
                <AudioPlayer src={segmentsData[title].audioUrl} />
                <div
                  className={`${
                    segmentsData[title].audioUrl ? "" : "hidden"
                  } flex items-center gap-2 mt-3`}
                >
                  {exportUploadBtnsData.map(
                    ({ btnText, clickHandle, icon }) => {
                      return (
                        <button
                          key={btnText}
                          onClick={() => clickHandle(title)}
                          className="w-full uppercase border border-blue-700 rounded-md px-9 py-3 flex gap-2 items-center justify-center"
                        >
                          <Image
                            src={icon}
                            alt="mic logo"
                            width={15}
                            height={15}
                          />
                          {btnText}
                          <SpinnerLoader
                            className={
                              (btnText == "export" &&
                                segmentsData[title].isLoadingDownloadAudio) ||
                              (btnText == "upload to cloud" &&
                                segmentsData[title].isLoadingExportAudio)
                                ? ""
                                : "hidden"
                            }
                          />
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
