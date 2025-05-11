"use client";

import { UserCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import UserModal from "@/molecules/UserModal";
import useCopilotStore from "@/stores/useCopilotStore";

export default function LandingNav() {
  const userData = useCopilotStore((state) => state.userData);
  const [showUser, setShowUser] = useState(false);
  const toggleSignIn = useCopilotStore((state) => state.toggleSignIn);

  function toggleUser() {
    setShowUser((prev) => !prev);
  }

  function UserBubble() {
    return (
      <div>
        <button onClick={toggleUser} className="rounded-full">
          <UserCircleIcon className="w-9" />
        </button>
      </div>
    );
  }

  function SignInBtns() {
    return (
      <div>
        <button onClick={toggleSignIn} className="hover:text-gray-200">
          Create Account
        </button>
        <button
          onClick={toggleSignIn}
          className="border-2 border-white hover:border-gray-200 hover:text-gray-200 rounded-full px-7 md:px-11 py-2 transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full mx-auto flex justify-end gap-6 md:gap-9 items-center py-7 text-sm whitespace-nowrap mb-11 md:mb-14">
      {userData ? <UserBubble /> : <SignInBtns />}
      <UserModal showUser={showUser} toggleUser={toggleUser} />
    </div>
  );
} 