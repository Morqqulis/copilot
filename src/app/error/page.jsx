"use client";
import React from "react";
import Footer from "@/organisms/Footer";
import BackToTopButton from "@/atoms/BackToTopButton";
import { Toaster } from "react-hot-toast";
import LandingNav from "@/atoms/LandingNav";
import SignInModal from "@/molecules/SignInModal";
import { useSearchParams } from "next/navigation";
import ErrorWrapper from "@/molecules/ErrorWrapper";
import logo404 from "@/assets/illustrations/404-not-found.svg";
import logoAuthentication from "@/assets/illustrations/authentication.svg";
import logoOnlinePayment from "@/assets/illustrations/online-payment.svg";
import { Suspense } from "react";

const errorTypesData = {
  404: {
    title: "Content Not Found",
    description: "can't seem to find the page",
    buttonText: "Go Back",
    buttonLink: "/",
    imgSrc: logo404,
  },
  "missing-user": {
    title: "Not Authenticated",
    description: "please sign in to access the features of this page",
    buttonText: "Go Back",
    buttonLink: "/",
    imgSrc: logoAuthentication,
  },
  "missing-payment": {
    title: "You are not Subscribed",
    description: "please subscribe to access the features of this page",
    buttonText: "Go Back",
    buttonLink: "/",
    imgSrc: logoOnlinePayment,
  },
};

export default function ErrorPage({ searchParams }) {
  const [showSignIn, setShowSignIn] = React.useState(false);
  const errorType = searchParams.type;

  const errorData =
    errorType == "missing-user"
      ? errorTypesData["missing-user"]
      : errorType == "missing-payment"
      ? errorTypesData["missing-payment"]
      : errorTypesData["404"];

  function toggleSignIn() {
    setShowSignIn((prev) => !prev);
  }

  return (
    <main className="w-full min-h-screen bg-[#181A1B] text-white flex flex-col justify-between relative">
      <Suspense>
        <div className="w-[min(85%,68.75rem)] mx-auto">
          <LandingNav toggleSignIn={toggleSignIn} />
          <ErrorWrapper {...errorData} />
        </div>
        <SignInModal showSignIn={showSignIn} toggleSignIn={toggleSignIn} />
        <BackToTopButton />
        <Footer />
        <Toaster />
      </Suspense>
    </main>
  );
}
