"use client";
import React from "react";
import ETHQR from "../assets/qr/eth.jpg";
import BTCQR from "../assets/qr/btc.png";
import DOGEQR from "../assets/qr/doge.png";
import CopyToClipBoard from "../atoms/CopyToClipboard";
import Image from "next/image";

/**
 * @typedef PropsType
 * @prop  {string} cryptoName
 */

/**
 * @param {PropsType} props
 */
export default function CryptoModal(props) {
  const { cryptoName } = props;

  const cryptoOptions = {
    bitcoin: {
      name: "BTC",
      img: BTCQR,
      adress: "35KhfNCSizNkZzekV8c1REEHDXe7qVurWF",
    },
    ethereum: {
      name: "ETHEREUM",
      img: ETHQR,
      adress: "0xA23AB0F6fb103870c2b9becC7A5Ca1F1E35BC424",
    },
    doge: {
      name: "DOGE",
      img: DOGEQR,
      adress: "DLF4tDmHHi7NB9kjnkw6FzMfhUw7NSR8aS",
    },
  };

  return (
    <div className="flex items-center text-center flex-col mt-4">
      <h2 className="text-xl font-semibold mb-6">
        Wallet Address for {cryptoOptions[cryptoName].name}
      </h2>
      <Image
        src={cryptoOptions[cryptoName].img}
        alt={cryptoOptions[cryptoName].name}
        width={160}
        height={160}
        className="w-40 h-auto mb-4"
      />
      <CopyToClipBoard adress={cryptoOptions[cryptoName].adress} />
    </div>
  );
}
