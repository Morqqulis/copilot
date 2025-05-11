"use client";
import React from "react";
import logo from "../assets/logo.svg";
import SubmitNewModal from "../molecules/SubmitNewsModal";
import DonateModal from "../molecules/DonateModal";
import Link from "next/link";
import useCopilotStore from "@/stores/useCopilotStore";
import Image from "next/image";

export default function Footer() {
  const toggleDonate = useCopilotStore((state) => state.toggleDonate);
  const toggleSubmit = useCopilotStore((state) => state.toggleSubmit);

  const links = [
    {
      name: "AI Showprep",
      onClick: () => {
        window.open("https://aishowprep.com/", "_blank");
      },
    },
  ];

  return (
    <footer className="bg-[#141617] mt-auto py-8 md:py-12">
      <div className="w-[min(90%,70rem)] flex flex-col md:flex-row items-center gap-4 mx-auto max-w-screen-xl p-4 md:items-center md:justify-between">
        <Link href="/">
          <Image
            src={logo}
            className="content-center w-36 sm:w-48"
            alt="Radio Co-Pilot Logo"
            width={192}
            height={48}
          />
        </Link>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-3 text-center justify-center items-center text-sm md:text-base font-medium">
          {links.map(({ name, onClick }) => (
            <li onClick={onClick} key={name}>
              <span className="hover:underline me-4 md:me-6 cursor-pointer">
                {name}
              </span>
            </li>
          ))}
        </ul>

        <span className="text-sm sm:text-center text-gray-500">
          © {new Date().getFullYear()} StudioSeven AB
        </span>
      </div>

      <SubmitNewModal />
      <DonateModal />
    </footer>
  );
}
