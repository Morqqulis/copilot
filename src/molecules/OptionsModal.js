"use client";
import React, { useContext } from "react";
import editions from "../editions.json";
import ArticleOptionsContext from "@/contexts/ArticleOptionsContext";
import CloseButton from "../atoms/CloseButton";
import Modal from "@/atoms/Modal";

export default function OptionsModal(props) {
  const { showOptions, toggleOptions } = props;
  const optionsContext = useContext(ArticleOptionsContext);
  const {
    articlesOptions: { selectedEdition, itemsPerCategory, newTab },
    updateOptions,
  } = optionsContext;

  function handleEditionChange(e) {
    const selectedEdition = e.target.value;
    updateOptions("selectedEdition", selectedEdition);
  }

  return (
    <Modal closeModal={toggleOptions} showModal={showOptions}>
      <div className="bg-[#070808] p-9 flex flex-col rounded-lg w-[min(90%,27rem)]">
        <CloseButton onClick={toggleOptions} />
        <h1 className="text-lg font-semibold mb-6">Options</h1>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label>Edition</label>
            <select
              className="text-sm rounded-lg w-full p-2.5 pr-4 bg-[#181A1B] text-white outline-none"
              onChange={handleEditionChange}
              value={selectedEdition}
            >
              {editions.map((ed) => (
                <option key={ed.value} value={ed.value}>
                  {ed.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label>Items per category:</label>
            <input
              type="number"
              min={0}
              value={itemsPerCategory}
              className="bg-[#181A1B] text-white outline-none pl-2 py-1 rounded-sm w-full"
              onChange={(e) =>
                updateOptions("itemsPerCategory", e.target.value)
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <label>Open in new tab</label>
            <input
              type="checkbox"
              checked={newTab}
              onChange={(e) => updateOptions("newTab", e.target.checked)}
            />
          </div>
          {process.env.REACT_APP_BTC_ADDRESS && this.optionsCount >= 2 && (
            <p style={{ fontSize: 12, color: "#666", float: "left" }}>
              BTC: {process.env.REACT_APP_BTC_ADDRESS}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}
