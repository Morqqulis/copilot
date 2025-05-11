"use client";
import React, { useEffect, useState } from "react";
import CloseButton from "../atoms/CloseButton";
import Modal from "@/atoms/Modal";
import SpinnerLoader from "@/atoms/SpinnerLoader";
import { useRouter } from "next/navigation";
import scrollToTargetAdjusted from "@/methods/scrollToTargetAdjusted";
import {
  signInUser,
  signOutUser,
  signUpUserWithEmailPassword,
} from "@/methods/signInUser";
import useCopilotStore from "@/stores/useCopilotStore";
import { getPortalUrl } from "@/account/stripePayment";

/**
 * @typedef PropsType
 * @prop  {boolean} showUser
 * @prop  {()=>void} toggleUser
 */

/**
 * @param {PropsType} props
 */
export default function UserModal(props) {
  const { showUser, toggleUser } = props;
  const userData = useCopilotStore((state) => state.userData);
  const userIsSubscribed = useCopilotStore((state) => state.userIsSubscribed);
  const [isLoadingPremium, setIsLoadingPremium] = useState(false);
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkStatusHandle();
  }, [userIsSubscribed]);

  async function checkStatusHandle() {
    if (!userData) return;
    if (userIsSubscribed == "loading") setIsLoadingStatus(true);
    else setIsLoadingStatus(false);
  }

  function closeModal() {
    toggleUser();
  }

  async function goPremiumHandle() {
    scrollToTargetAdjusted("pricing", 50);
    toggleUser();
  }

  async function gotPortalHandle() {
    setIsLoadingPortal(true);
    const url = await getPortalUrl();
    setIsLoadingPortal(false);
    router.push(url);
  }

  if (!userData) return <></>;
  return (
    <Modal closeModal={closeModal} showModal={showUser}>
      <div
        className={`w-[min(90%,22rem)] bg-[#070808] p-9 pb-12 flex flex-col justify-center items-center rounded-lg text-center whitespace-normal`}
      >
        <CloseButton onClick={closeModal} />
        <h1 className="w-full text-base md:text-2xl font-semibold mt-8 mb-2">
          Welcome {userData.displayName ? userData.displayName : "User"} !
        </h1>
        <span className="w-full text-base mb-5 flex items-center gap-2 text-center justify-center">
          {isLoadingStatus ? (
            <LoadingSpinner isHidden={!isLoadingStatus} />
          ) : userIsSubscribed ? (
            "You Are Currently Subscribed"
          ) : (
            "You Are Not Currently Subscribed"
          )}
        </span>
        <div className="flex flex-col md:flex-row gap-3 items-center md:items-start justify-center w-full">
          <button
            onClick={() => {
              signOutUser();
              closeModal();
            }}
            className="w-full md:w-fit border-2 border-white hover:border-gray-200 hover:text-gray-200 rounded-md max-w-96 px-6 md:px-6 py-2.5 mx-auto whitespace-nowrap"
          >
            Sign Out
          </button>
          <CallToActionBtn
            clickHandle={userIsSubscribed ? gotPortalHandle : goPremiumHandle}
            text={userIsSubscribed ? "Go To Portal" : "Go Premium"}
            isLoadingListener={
              userIsSubscribed ? isLoadingPortal : isLoadingPremium
            }
            isLoadingStatus
            userIsSubscribed
          />
        </div>
      </div>
    </Modal>
  );
}

function LoadingSpinner({ isHidden }) {
  return (
    <SpinnerLoader
      className={`${
        isHidden ? "hidden" : ""
      } w-5 aspect-square text-gray-200 animate-spin dark:text-gray-600 fill-blue-600`}
    />
  );
}

function CallToActionBtn({
  clickHandle,
  text,
  isLoadingListener,
  userIsSubscribed,
}) {
  if (userIsSubscribed == null || userIsSubscribed == "loading") return <></>;
  return (
    <button
      onClick={clickHandle}
      className={`w-full md:w-fit items-center justify-center relative gap-2 outline-none p-0.5 mb-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white text-white`}
    >
      <span
        className={`flex whitespace-nowrap w-full items-center justify-center gap-2 relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0`}
      >
        {text} <LoadingSpinner isHidden={!isLoadingListener} />
      </span>
    </button>
  );
}
