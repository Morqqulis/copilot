"use client";
import React from "react";
import { useEffect } from "react";
import { getPremiumStatus } from "@/account/getPremiumStatus";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import checkIsWhitelist from "@/account/checkIsWhiteList";
import useCopilotStore from "@/stores/useCopilotStore";

export default function AppWrapper({ children }) {
  const userData = useCopilotStore((state) => state.userData);
  const updateUserData = useCopilotStore((state) => state.updateUserData);
  const updateUserIsSubscribed = useCopilotStore(
    (state) => state.updateUserIsSubscribed
  );

  useEffect(() => {
    checkingIfSubscribed();
  }, [userData]);

  async function checkingIfSubscribed() {
    if (!userData) return;
    try {
      const isWhiteListed = checkIsWhitelist(userData.email);
      updateUserIsSubscribed("loading");
      const currentPremiumStatus = await getPremiumStatus();
      const isSubbed = isWhiteListed ? true : currentPremiumStatus.length > 0;
      if (isSubbed) {
        updateUserIsSubscribed(true);
      } else updateUserIsSubscribed(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // Listening for auth changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User is signed in
        console.log("found a user already signed in");
        updateUserData(currentUser);

        fetch("/api/login", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await currentUser.getIdToken()}`,
          },
        }).then((response) => {
          if (response.status === 200) {
            console.log("everything good !");
          }
        });
      } else {
        // User is signed out
        console.log("could not find authenticated user");
        updateUserData(null);

        try {
          //Clear the cookies in the server
          const response = await fetch("/api/signout");

          if (response.status === 200) {
            console.log("cookies are cleared");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      {children}
    </>
  );
}
