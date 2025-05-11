"use client";
import React from "react";
import DOGICON from "../assets/qr/doge-icon.png";
import CloseButton from "../atoms/CloseButton";
import CryptoModal from "./CryptoModal";
import ReturnButton from "../atoms/ReturnButton";
import Image from "next/image";
import Modal from "@/atoms/Modal";
import useCopilotStore from "@/stores/useCopilotStore";

/**
 * @typedef PropsType
 * @prop  {boolean} showDonate
 * @prop  {()=>void} toggleDonate
 */

/**
 * @param {PropsType} props
 */
export default function DonateModal() {
  const showDonate = useCopilotStore((state) => state.showDonate);
  const toggleDonate = useCopilotStore((state) => state.toggleDonate);
  const [selectedCrypto, setSelectedCrypto] = React.useState(null);

  const cryptoOptions = [
    {
      onClick: () => {
        setSelectedCrypto("bitcoin");
      },
      img: "https://images.vexels.com/media/users/3/144837/isolated/lists/40f189daa5c0279718484ca5f5569f78-bitcoin-icon.png",
      name: "Bitcoin",
    },
    {
      onClick: () => {
        setSelectedCrypto("ethereum");
      },
      img: "https://thegivingblock.com/wp-content/uploads/2021/07/Ethereum-ETH-Logo.png",
      name: "Ethereum",
    },
    {
      onClick: () => {
        setSelectedCrypto("doge");
      },
      img: DOGICON.src,
      name: "DOGE",
    },
  ];

  const CryptoOptionsElement = () => (
    <React.Fragment>
      <h1 className="text-xl font-medium mb-5">Donate</h1>
      <div>
        <p>Please donate to the project to keep it running</p>
        <div className="mt-2 flex w-fit mx-auto py-3 sm:py-1 flex-col sm:flex-row items-center justify-between bg-[#181A1B] rounded-md">
          {cryptoOptions.map((crypto) => {
            const { img, name, onClick } = crypto;
            return (
              <div
                key={name}
                onClick={onClick}
                className=" text-white w-40 h-16 flex items-center gap-2 justify-center hover:font-semibold cursor-pointer"
              >
                <div>
                  <Image
                    src={img}
                    width={50}
                    alt={name + "-logo"}
                    height={60}
                  />
                </div>
                <p>{name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );

  function closeModal() {
    toggleDonate();
    setSelectedCrypto(null);
  }

  function returnToOptions() {
    setSelectedCrypto(null);
  }

  return (
    <Modal closeModal={closeModal} showModal={showDonate}>
      <div
        className={`bg-[#070808] p-9 pb-12 flex flex-col rounded-lg text-center sm:text-left ${
          selectedCrypto == null ? "w-[min(90%,34rem)]" : "w-[min(90%,25rem)]"
        }`}
      >
        <div className="flex items-center w-full">
          {selectedCrypto != null ? (
            <ReturnButton onClick={returnToOptions} />
          ) : (
            ""
          )}
          <CloseButton onClick={closeModal} />
        </div>
        {selectedCrypto == null ? (
          <CryptoOptionsElement />
        ) : (
          <CryptoModal cryptoName={selectedCrypto} />
        )}
      </div>
    </Modal>
  );
}
