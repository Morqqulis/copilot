import admin from "firebase-admin";
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

export default async function getPremiumStatus(userId: string) {
  const subscriptionsRef = admin
    .firestore()
    .collection("customers")
    .doc(userId)
    .collection("subscriptions");

  // Query for active or trialing subscriptions
  const activeSubscriptionsQuery = subscriptionsRef.where("status", "in", [
    "trialing",
    "active",
  ]);

  try {
    const snapshot = await activeSubscriptionsQuery.get();

    if (snapshot.empty) {
      console.log("No active or trialing subscriptions found");
      return false;
    }

    // Map to get only the price IDs from active subscriptions
    const priceIds = [];
    for (let i = 0; i < snapshot.docs.length; i++) {
      const currentDocPriceId = snapshot.docs[i].data().price.id;
      if (copilotProductPriceIds.includes(currentDocPriceId))
        priceIds.push(currentDocPriceId);
    }

    console.log("Active subscription price IDs:", priceIds);
    return priceIds.length > 0; // Array of price IDs
  } catch (error) {
    console.error("Error retrieving subscription data:", error);
    throw new Error("Failed to get subscription status");
  }
}
