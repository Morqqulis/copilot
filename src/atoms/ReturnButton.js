"use client";
import React from "react";

/**
 * @typedef PropsType
 * @prop {()=>void} onClick
 */

/**
 *
 * @param {PropsType} props
 * @returns
 */
export default function ReturnButton(props) {
  return (
    <button className="" onClick={props.onClick}>
      <svg
        width={40}
        viewBox="0 0 24.00 24.00"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#ffffff"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#CCCCCC"
          strokeWidth="0.048"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M6 12H18M6 12L11 7M6 12L11 17"
            stroke="#ffffff"
            strokeWidth="1.9200000000000004"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </svg>
    </button>
  );
}
