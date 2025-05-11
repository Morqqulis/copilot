"use client";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { auth, app, db } from "@/firebase/firebase";

export async function goToPremium(priceId) {
  const checkoutUrl = await getCheckoutUrl(priceId);
  return checkoutUrl;
}

export const getCheckoutUrl = async (priceId) => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User is not authenticated");
  const checkoutSessionRef = collection(
    db,
    "customers",
    userId,
    "checkout_sessions"
  );

  const docRef = await addDoc(checkoutSessionRef, {
    price: priceId,
    success_url: window.location.origin + "/payment/success",
    cancel_url: window.location.origin + "/error?type=missing-payment",
  });

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data();
      if (error) {
        unsubscribe();
        reject(new Error(`An error occurred: ${error.message}`));
      }
      if (url) {
        console.log("Stripe Checkout URL:", url);
        unsubscribe();
        resolve(url);
      }
    });
  });
};

export const getPortalUrl = async () => {
  const user = auth.currentUser;
  let dataWithUrl;
  try {
    const functions = getFunctions(app, "us-central1");
    const functionRef = httpsCallable(
      functions,
      "ext-firestore-stripe-payments-createPortalLink"
    );
    const { data } = await functionRef({
      customerId: user?.uid,
      returnUrl: window.location.origin,
    });

    // Add a type to the data
    dataWithUrl = data;
    console.log("Reroute to Stripe portal: ", dataWithUrl.url);
  } catch (error) {
    console.error(error);
  }

  return new Promise((resolve, reject) => {
    if (dataWithUrl.url) {
      resolve(dataWithUrl.url);
    } else {
      reject(new Error("No url returned"));
    }
  });
};
