"use client";
import SignInToggleContext from "@/contexts/SignInToggleContext";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { useContext } from "react";
import scrollToTargetAdjusted from "@/methods/scrollToTargetAdjusted";
import useCopilotStore from "@/stores/useCopilotStore";
import Link from "next/link";

export default function RegisterNowBtn() {
  const { toggleSignIn } = useContext(SignInToggleContext);
  const userData = useCopilotStore((state) => state.userData);
  const userIsSubscribed = useCopilotStore((state) => state.userIsSubscribed);
  const isUserSignedIn = userData ? true : false;

  function scrollToPlans() {
    scrollToTargetAdjusted("pricing", 50);
  }

  function goToApp() {
    return "/news";
  }

  function clickHandle() {
    if (isUserSignedIn == false) {
      toggleSignIn();
      return;
    }
    userIsSubscribed == true ? goToApp() : scrollToPlans();
  }

  function buttonText() {
    if (isUserSignedIn == false) return "Register Now";
    else return userIsSubscribed == true ? "Go To App" : "Select Plan";
  }

  const Component = isUserSignedIn && userIsSubscribed ? Link : "button";

  return (
    <Component
      onClick={clickHandle}
      href={goToApp()}
      className="w-auto flex items-center gap-2 bg-transparent border border-white hover:border-slate-200 text-white px-6 py-2 rounded-full font-normal whitespace-nowrap"
    >
      {buttonText()} <ArrowRightIcon width={15} />
    </Component>
  );
}
