"use client";

import { XMarkIcon } from "@heroicons/react/16/solid";
import { signIn } from "next-auth/react";
import { useState } from "react";
import SpinnerLoader from "@/atoms/SpinnerLoader";
import toast from "react-hot-toast";

export default function SignInModal({ showSignIn, toggleSignIn }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      toast.error("Failed to sign in");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!showSignIn) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 relative max-w-md w-full mx-4">
        <button
          onClick={toggleSignIn}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <XMarkIcon className="w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className="w-full py-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <SpinnerLoader className="w-5 aspect-square animate-spin" />
          ) : (
            "Continue with Google"
          )}
        </button>
      </div>
    </div>
  );
} 