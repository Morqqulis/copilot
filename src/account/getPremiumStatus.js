import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from "@/firebase/firebase";
import {
  proIntegrationPriceID,
  basicAccessPriceID,
  callersPackagePriceID,
} from "@/account/products";

const copilotProductPriceIds = [
  proIntegrationPriceID,
  basicAccessPriceID,
  callersPackagePriceID,
];

export const getPremiumStatus = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User not logged in");
  const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
  const q = query(
    subscriptionsRef,
    where("status", "in", ["trialing", "active"])
  );

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // In this implementation we only expect one active or trialing subscription to exist.
        if (snapshot.docs.length === 0) {
          console.log("No active or trialing subscriptions found");
          resolve(false);
        } else {
          const priceIds = [];
          for (let i = 0; i < snapshot.docs.length; i++) {
            const currentDocPriceId = snapshot.docs[i].data().price.id;
            if (copilotProductPriceIds.includes(currentDocPriceId))
              priceIds.push(currentDocPriceId);
          }
          if (priceIds.length > 0)
            console.log("Active or trialing subscription found");
          else console.log("No active or trialing subscriptions found");
          resolve(priceIds);
        }
        unsubscribe();
      },
      reject
    );
  });
};
