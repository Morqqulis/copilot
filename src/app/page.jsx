"use client";

import Footer from "@/organisms/Footer";
import BackToTopButton from "@/atoms/BackToTopButton";
import { Toaster } from "react-hot-toast";
import LandingNav from "@/atoms/LandingNav";
import LandingHero from "@/atoms/LandingHero";
import LandingPricing from "@/molecules/LandingPricing";
import LandingFeatures from "@/molecules/LandingFeatures";
import LandingCallToAction from "@/atoms/LandingCallToAction";
import SignInModal from "@/molecules/SignInModal";
import useCopilotStore from "@/stores/useCopilotStore";

export default function Main() {
  const showSignIn = useCopilotStore((state) => state.showSignIn);
  const toggleSignIn = useCopilotStore((state) => state.toggleSignIn);

  return (
    <main className="w-full min-h-screen bg-[#181A1B] text-white flex flex-col justify-between relative">
      <div className="w-[min(85%,68.75rem)] mx-auto">
        <LandingNav />
        <LandingHero />
        <LandingPricing />
        <LandingFeatures />
        <LandingCallToAction />
      </div>
      <SignInModal showSignIn={showSignIn} toggleSignIn={toggleSignIn} />
      <BackToTopButton />
      <Footer />
      <Toaster />
    </main>
  );
}
