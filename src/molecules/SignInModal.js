"use client";
import React, { useState } from "react";
import googleIcon from "@/assets/icons/google-icon.svg";
import githubIcon from "@/assets/icons/github-logo.svg";
import EmailForm from "@/atoms/EmailForm";
import ProviderOptions from "@/atoms/ProviderOptions";
import Spinner from "@/atoms/SpinnerLoader";
import RegisterNewAccount from "@/atoms/RegisterNewAccount";
import SignInLoadsContext from "@/contexts/SignInLoadsContext";
import { signUpUserWithEmailPassword, signInUser } from "@/methods/signInUser";
import Modal from "@/atoms/Modal";
import CloseButton from "@/atoms/CloseButton";
import useCopilotStore from "@/stores/useCopilotStore";

/**
 * @typedef PropsType
 * @prop  {boolean} showSubmit
 * @prop  {()=>void} toggleSubmit
 */

/**
 * @param {PropsType} props
 */
export default function SignInModal() {
  const toggleSignIn = useCopilotStore((state) => state.toggleSignIn);
  const showSignIn = useCopilotStore((state) => state.showSignIn);
  const [isRegister, setIsRegister] = useState(false);
  const updateUserData = useCopilotStore((state) => state.updateUserData);
  const [isSignInLoad, setIsSignInLoad] = useState(false);

  const inputsData = [
    {
      type: "email",
      placeholder: "Enter your email",
    },
    {
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  const providerOptionsData = [
    {
      provider: "Google",
      icon: googleIcon,
      onSelectHandle: () => {
        signInUser(updateUserData, "google", setIsSignInLoad, closeModal);
      },
    },
    {
      provider: "Github",
      icon: githubIcon,
      onSelectHandle: () => {
        signInUser(updateUserData, "github", setIsSignInLoad, closeModal);
      },
    },
  ];

  function submitLoginEmail(email, passwrd) {
    signInUser(
      updateUserData,
      "emailPassword",
      setIsSignInLoad,
      closeModal,
      email,
      passwrd
    );
  }

  function submitCreateEmail(email, passwrd) {
    signUpUserWithEmailPassword(
      updateUserData,
      setIsSignInLoad,
      closeModal,
      email,
      passwrd
    );
  }

  function closeModal() {
    toggleSignIn();
  }

  function toggleRegister() {
    setIsRegister((prev) => !prev);
  }

  return (
    <Modal closeModal={closeModal} showModal={showSignIn}>
      <SignInLoadsContext.Provider
        value={(isSignInLoad, setIsSignInLoad, closeModal)}
      >
        <div
          className={`bg-[#070808] p-9 pb-12 flex flex-col items-center rounded-lg text-center sm:text-left text-white ${
            showSignIn == null ? "w-[min(90%,34rem)]" : "w-[min(90%,25rem)]"
          }`}
        >
          <CloseButton onClick={closeModal} />
          <h2 className="text-left w-full md:text-2xl font-semibold md:font-bold mb-8 mt-5">
            {isRegister ? "Create an account" : "Sign in to your account"}
          </h2>

          {isRegister ? (
            <RegisterNewAccount
              onSubmit={submitCreateEmail}
              toggleRegister={toggleRegister}
              inputsData={inputsData}
            />
          ) : (
            <>
              <EmailForm
                onSubmit={submitLoginEmail}
                toggleRegister={toggleRegister}
                inputsData={inputsData}
              />
              <div className="border-t border-slate-600 w-full md:w-[90%] my-5"></div>
              <ProviderOptions providerOptionsData={providerOptionsData} />
            </>
          )}
        </div>
        <LoadingScreen isLoading={isSignInLoad} />
      </SignInLoadsContext.Provider>
    </Modal>
  );
}

function LoadingScreen({ isLoading }) {
  return (
    <div
      className={`${
        isLoading ? "" : "hidden"
      } absolute top-0 left-0 w-full h-full bg-black opacity-50 flex justify-center items-center`}
    >
      <Spinner />
    </div>
  );
}
