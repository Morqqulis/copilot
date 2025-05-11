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
export default function CloseButton(props) {
  return (
    <button className="ml-auto" onClick={props.onClick}>
      <svg
        className="w-5 h-5"
        fill="#ffffff"
        height="200px"
        width="200px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        stroke="#ffffff"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <g>
              <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 512,452.922 315.076,256 "></polygon>{" "}
            </g>
          </g>
        </g>
      </svg>
    </button>
  );
}
