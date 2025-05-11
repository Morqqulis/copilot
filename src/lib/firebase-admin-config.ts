import { initializeApp, getApps, cert } from "firebase-admin/app";

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.SERT_PROJECT_ID,
    clientEmail: process.env.SERT_CLIENT_EMAIL,
    privateKey: process.env.SERT_PRIVATE_KEY,
  }),
};

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}
