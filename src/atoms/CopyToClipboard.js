"use client";
import React from "react";

/**
 * @typedef PropsType
 * @prop {string} adress
 */

/**
 *
 * @param {PropsType} props
 * @returns
 */
export default function CopyToClipBoard({ adress }) {
  const [copied, setCopied] = React.useState(false);

  const text = copied ? "copied to clipboard" : adress;

  function copy() {
    navigator.clipboard.writeText(adress);
    setCopied(true);
    setTimeout(function () {
      setCopied(false);
    }, 5000);
  }

  return (
    <div
      onClick={copy}
      className="flex items-center justify-center gap-2 w-full max-w-[16rem] cursor-pointer relative bg-[#181A1B] rounded-full px-2 py-2"
    >
      <span
        className={`w-44 whitespace-nowrap overflow-hidden bg-transparent cursor-pointer overflow-ellipsis ${
          copied ? "text-blue-300" : ""
        }`}
      >
        {text}
      </span>
      <button className="text-gray-400 hover:bg-gray-800 inline-flex items-center justify-center">
        {copied ? <SuccessIcon /> : <DefaultIcon />}
      </button>
    </div>
  );
}

const SuccessIcon = () => (
  <span>
    <svg
      className="w-3.5 h-3.5 text-blue-300"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 12"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5.917 5.724 10.5 15 1.5"
      />
    </svg>
  </span>
);

const DefaultIcon = () => (
  <span>
    <svg
      className="w-3.5 h-3.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 18 20"
    >
      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
    </svg>
  </span>
);
