"use client";

import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import {
  callersPackagePriceID,
  basicAccessPriceID,
  proIntegrationPriceID,
} from "@/account/products";
import SpinnerLoader from "@/atoms/SpinnerLoader";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useCopilotStore from "@/stores/useCopilotStore";
import { goToPremium } from "@/account/stripePayment";

export default function LandingPricing() {
  const toggleSignIn = useCopilotStore((state) => state.toggleSignIn);
  const userData = useCopilotStore((state) => state.userData);
  const userIsSubscribed = useCopilotStore((state) => state.userIsSubscribed);
  const isUserSignedIn = userData ? true : false;
  const [planLoadingIndex, setPlanLoadingIndex] = useState(null);
  const router = useRouter();

  async function selectPlan(priceID, index) {
    if (isUserSignedIn) {
      setPlanLoadingIndex(index);
      try {
        const url = await goToPremium(priceID);
        router.push(url);
      } catch (error) {
        toast.error("an error occurred while getting payment link");
        console.error(error);
        setPlanLoadingIndex(null);
      }
    } else toggleSignIn();
  }

  const pricingPlansData = [
    {
      title: "Liner Notes & Callers Package",
      price: 499,
      benefits: [
        "All you need to keep your show fresh and engaging and add AI-driven caller segments to keep the conversation flowing",
      ],
      onSelect: (index) => selectPlan(callersPackagePriceID, index),
    },
    {
      title: "Basic Access",
      price: 1495,
      isRecommended: true,
      benefits: [
        "Essential tools for AI-driven voice tracking, news, and weather to keep your show on air, anywhere.",
      ],
      onSelect: (index) => selectPlan(basicAccessPriceID, index),
    },
    {
      title: "Pro Studio Integration",
      price: 1995,
      isRecommended: true,
      benefits: [
        "Unlock advanced features with seamless Omniplayer integration for a full-production studio experience.",
      ],
      onSelect: (index) => selectPlan(proIntegrationPriceID, index),
    },
  ];

  return (
    <div className="text-sm md:text-base text-center mb-16 md:mb-20 mx-auto">
      <h2 id="pricing" className="text-xl md:text-2xl font-bold mb-3">
        Elevate Your Show: AI at Your Command
      </h2>
      <p className="text-gray-400 mb-8 max-w-96 mx-auto">
        Streamline Voice Tracking, News, and More - All in One Place
      </p>
      <ul className="grid place-items-center lg:grid-cols-3 items-center md:items-start gap-6">
        {pricingPlansData.map(({ title, price, benefits, onSelect }, index) => (
          <li
            key={title}
            className="border-2 border-zinc-700/50 px-7 py-6 rounded-2xl text-left w-[min(100%,22rem)] md:min-h-[22rem] flex flex-col bg-zinc-800/30 backdrop-blur-sm hover:border-zinc-600 transition-colors"
          >
            <h3 className="text-2xl font-semibold mb-3">{title}</h3>
            <div className="mb-2">
              <span className="font-medium mr-2 text-lg">${price}</span>
              <small>starting per week</small>
            </div>
            <ul className={`${userIsSubscribed == true ? "mt-4" : ""} mb-5`}>
              {benefits.map((b) => (
                <li className="flex items-start gap-3 w-full" key={b}>
                  <span className="w-5 pt-1">
                    <CheckCircleIcon width={20} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => onSelect(index)}
              className={`${userIsSubscribed == true ? "hidden" : ""}
                bg-white mt-auto w-fit hover:bg-slate-200 flex items-center gap-2 text-black px-6 py-2.5 rounded-full font-semibold transition-colors`}
            >
              {isUserSignedIn ? "Select Plan" : "Sign In to select Plan"}{" "}
              {planLoadingIndex == index ? (
                <SpinnerLoader className="w-5 aspect-square animate-spin text-gray-700 fill-black" />
              ) : (
                <ArrowRightIcon width={15} />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 