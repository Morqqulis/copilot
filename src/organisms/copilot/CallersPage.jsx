"use client";

import { useRef, useState } from "react";
import yellowMicIcon from "@/assets/icons/yellow-mic-icon.svg";
import editIcon from "@/assets/icons/edit-icon.svg";
import saveIcon from "@/assets/icons/save-icon.svg";
import Image from "next/image";
import AudioPlayer from "@/molecules/AudioPlayer";
import SpinnerLoader from "@/atoms/SpinnerLoader";
import generateCallsPreviewOrExport from "@/methods/generateCallsPreviewOrExport";
import ScreenWrapper from "./ScreenWrapper";
import toast from "react-hot-toast";

const talkingStylesValues = ["normal", "energetic", "calm"];

const dummyText =
  "I, I just woke up from a dream. Where you and I had to say goodbye. And I don't know what it all means. But since I survived, I realized";

export default function CallersPage() {
  const [talkingStyle, setTalkingStyle] = useState("energetic");
  const [content, setContent] = useState(dummyText);
  const textAreaRef = useRef(null);
  const [isFetchingAudio, setIsFetchingAudio] = useState(false);
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);
  const [isExportingAudio, setIsExportingAudio] = useState(false);
  const [previewAudioUrl, setPreviewAudioUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  function updateTalkingStyle(value) {
    setTalkingStyle(value);
  }

  function handleEdit() {
    if (isEditing) {
      textAreaRef.current.disabled = true;
      const value = textAreaRef.current.value;
      setContent(value);
    } else {
      textAreaRef.current.disabled = false;
      const textLength = textAreaRef.current.value.length;
      textAreaRef.current.focus();
      textAreaRef.current.setSelectionRange(textLength, textLength);
    }
    setIsEditing((prev) => !prev);
  }

  const previewAudio = async () => {
    await generateCallsPreviewOrExport(
      true,
      { content },
      setPreviewAudioUrl,
      setIsFetchingAudio
    );
  };

  const uploadAudio = () => {
    generateCallsPreviewOrExport(
      false,
      { content },
      (audioUrl) => {
        console.log("Upload to firebase, audio URL:", audioUrl);
      },
      setIsUploadingAudio
    );
  };

  const textAreaEditButtons = [
    {
      icon: isEditing ? saveIcon : editIcon,
      title: "edit",
      onClickHandle: handleEdit,
    },
    {
      icon: yellowMicIcon,
      title: "mic",
      onClickHandle: previewAudio,
    },
  ];

  const handleExport = async () => {
    setIsExportingAudio(true);
    if (!previewAudioUrl) await previewAudio();
    try {
      const response = await fetch(previewAudioUrl);
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const a = document.createElement("a");
      a.href = audioUrl;
      a.download = "audio.mp3";
      a.click();
      setIsExportingAudio(false);
    } catch (error) {
      console.error("Failed to export audio:", error);
      toast.error("something went wrong");
      setIsExportingAudio(false);
    }
  };

  return (
    <ScreenWrapper>
      <div className="w-[min(48rem,90%)] mx-auto flex flex-col items-start gap-6">
        <div className="flex items-center justify-between gap-5 w-full">
          <div className="flex items-center gap-4 text-white">
            <span>Style</span>
            <ul className="grid grid-cols-3 items-center capitalize cursor-pointer font-semibold justify-center bg-gray-800 rounded-md overflow-hidden">
              {talkingStylesValues.map((ts) => {
                return (
                  <li
                    onClick={() => updateTalkingStyle(ts)}
                    key={ts}
                    className={`${
                      ts == talkingStyle
                        ? "bg-green-400 text-gray-900"
                        : "hover:bg-gray-900"
                    } px-5 py-4 w-full h-full `}
                  >
                    {ts}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="w-full">
          <h2 className="font-medium text-lg mb-3">Text</h2>
          <div className="w-full border border-red-600 rounded-lg bg-sidePanel p-5 pb-6">
            <textarea
              disabled={!isEditing}
              ref={textAreaRef}
              className="placeholder:text-opacity-80 w-full bg-transparent resize-none border-none !shadow-none !outline-none !ring-transparent"
              name=""
              id=""
              cols="30"
              rows="6"
              placeholder="write something..."
              defaultValue={content}
            ></textarea>
            <ul className="flex items-center gap-4">
              {textAreaEditButtons.map(({ icon, title, onClickHandle }) => {
                const iconSize = 20;
                return (
                  <li key={title}>
                    <button
                      disabled={isFetchingAudio}
                      onClick={onClickHandle}
                      className={`bg-bigBg hover:bg-opacity-70 rounded-full px-3 py-2`}
                    >
                      {isFetchingAudio ? (
                        <SpinnerLoader className={"w-5"} />
                      ) : (
                        <Image
                          src={icon}
                          alt={title}
                          width={iconSize}
                          height={iconSize}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <AudioPlayer src={previewAudioUrl} />
        </div>

        <div className="flex items-center w-full gap-2">
          <button
            className="flex items-center justify-center gap-2 whitespace-nowrap border w-full uppercase border-blue-400 hover:text-blue-400 bg-transparent rounded-lg px-7 py-2"
            onClick={uploadAudio}
          >
            save to cloud
            {isUploadingAudio && <SpinnerLoader iconSize={5} />}
          </button>
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 whitespace-nowrap bg-cyan-700 hover:bg-cyan-800 w-full text-center uppercase py-2 rounded-lg"
          >
            export audio
            {isExportingAudio && <SpinnerLoader iconSize={5} />}
          </button>
        </div>
        <SongInput />
      </div>
    </ScreenWrapper>
  );
}

function SongInput() {
  return (
    <div className="w-full flex items-center gap-4">
      Filename
      <input
        className="pl-4 bg-transparent w-full border-2 border-gray-500 text-white rounded-lg placeholder:font-medium placeholder:capitalize"
        type="text"
        placeholder="Jenna > Bruno Mars Lady Gaga"
      />
    </div>
  );
}
