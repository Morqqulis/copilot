import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

// Initialize Firebase Auth provider
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
googleProvider.setCustomParameters({
  prompt: "select_account ",
});

githubProvider.setCustomParameters({
  prompt: "select_account ",
});

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGithubPopup = () =>
  signInWithPopup(auth, githubProvider);

export function signUpUserEmailPassword(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function loginUserEmailPassword(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export { googleProvider, githubProvider };
