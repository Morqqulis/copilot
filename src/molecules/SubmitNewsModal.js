"use client";
import React from "react";
import CloseButton from "../atoms/CloseButton";
import Modal from "@/atoms/Modal";
import useCopilotStore from "@/stores/useCopilotStore";

/**
 * @typedef PropsType
 * @prop  {boolean} showSubmit
 * @prop  {()=>void} toggleSubmit
 */

/**
 * @param {PropsType} props
 */
export default function SubmitNewModal() {
  const showSubmit = useCopilotStore((state) => state.showSubmit);
  const toggleSubmit = useCopilotStore((state) => state.toggleSubmit);

  function closeModal() {
    toggleSubmit();
  }

  return (
    <Modal closeModal={closeModal} showModal={showSubmit}>
      <div
        className={`bg-[#070808] p-9 pb-12 flex flex-col rounded-lg text-center sm:text-left ${
          showSubmit == null ? "w-[min(90%,34rem)]" : "w-[min(90%,25rem)]"
        }`}
      >
        <CloseButton onClick={closeModal} />
        <h1 className="text-lg font-semibold my-8 mb-5">
          Share news tips with us confidentially
        </h1>
        <div className="App-modalbody">
          <p>
            Do you have information the public should know? We are working on
            ways you can securely send information and documents to us.
            Meanwhile you can email us{" "}
            <a
              className="text-blue-400 font-semibold"
              href="mailto:newsengine@protonmail.com>"
              target="_blank"
              rel="noopener noreferrer"
            >
              from here
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
}
