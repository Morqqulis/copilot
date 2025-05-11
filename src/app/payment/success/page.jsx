"use client";
import React, { useContext } from "react";
import Footer from "@/organisms/Footer";
import BackToTopButton from "@/atoms/BackToTopButton";
import { Toaster } from "react-hot-toast";
import LandingNav from "@/atoms/LandingNav";
import SignInModal from "@/molecules/SignInModal";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Payment() {
  const [showSignIn, setShowSignIn] = React.useState(false);

  function toggleSignIn() {
    setShowSignIn((prev) => !prev);
  }

  return (
    <main className="w-full min-h-screen bg-[#181A1B] text-white flex flex-col justify-between relative">
      <div className="w-[min(85%,68.75rem)] mx-auto">
        <LandingNav toggleSignIn={toggleSignIn} />
        <div className="text-sm md:text-base text-center flex flex-col items-center mb-20 md:mb-20">
          <h2 className="text-xl md:text-5xl font-semibold mb-3 md:mb-8">
            You are now Subscribed !
          </h2>
          <p className="text-gray-400 max-w-96 md:max-w-[32rem] mb-10">
            Visit the news page to explore our latest features.
          </p>
          <Link
            href="/news"
            className="w-auto flex items-center gap-2 bg-transparent border border-white hover:border-slate-200 text-white px-6 py-2 rounded-full font-normal whitespace-nowrap"
          >
            Go to App <ArrowRightIcon width={15} />
          </Link>
        </div>
      </div>
      <SignInModal showSignIn={showSignIn} toggleSignIn={toggleSignIn} />
      <BackToTopButton />
      <Footer />
      <Toaster />
    </main>
  );
}
