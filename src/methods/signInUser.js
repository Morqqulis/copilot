import { auth } from "@/firebase/firebase";
import {
  signInWithGooglePopup,
  signInWithGithubPopup,
  signUpUserEmailPassword,
  loginUserEmailPassword,
} from "@/firebase/firebase.utils";
import useCopilotStore from "@/stores/useCopilotStore";
import { fetchSignInMethodsForEmail, signOut } from "firebase/auth";
import toast from "react-hot-toast";

const signInMethods = {
  google: signInWithGooglePopup,
  github: signInWithGithubPopup,
  emailPassword: loginUserEmailPassword,
};

async function signInUser(
  updateUserData,
  method,
  setIsSignInLoad,
  closeModal,
  email = null,
  password = null
) {
  setIsSignInLoad(true);
  signInMethods[method](email, password)
    .then((response) => {
      setIsSignInLoad(false);
      updateUserData(response.user);
      toast.success(
        `welcome ${
          response.user.displayName ? response.user.displayName : "back"
        } !`
      );
      closeModal();
    })
    .catch((error) => {
      setIsSignInLoad(false);
      if (error.code == "auth/account-exists-with-different-credential")
        emailAlreadyInUseNotification(error.customData.email);
      else if (error.code == "auth/email-already-in-use")
        emailAlreadyInUseNotification(email);
      else if (error.code == "auth/wrong-password")
        toast.error("wrong password");
      else if (error.code == "auth/user-not-found")
        toast.error("user not found");
      else console.error(error);
    });
}

function emailAlreadyInUseNotification(email) {
  fetchSignInMethodsForEmail(auth, email)
    .then((methods) => {
      if (methods.includes("google.com"))
        toast.error("email already used for google sign in.");
      else if (methods.includes("github.com"))
        toast.error("email already used for github sign in.");
    })
    .catch((error) => console.log(error));
}

const signOutUser = () => {
  const updateUserData = useCopilotStore.getState().updateUserData;
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully.");
      updateUserData(null);
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};

async function signUpUserWithEmailPassword(
  updateUserData,
  setIsSignInLoad,
  closeModal,
  email,
  password
) {
  setIsSignInLoad(true);
  signUpUserEmailPassword(email, password)
    .then((reponse) => {
      setIsSignInLoad(false);
      updateUserData(reponse.user);
      console.log("welcome", reponse.user.displayName, "!");
      toast.success("successfully signed in !");
      closeModal();
    })
    .catch((error) => {
      setIsSignInLoad(false);
      if (error.code == "auth/account-exists-with-different-credential")
        emailAlreadyInUseNotification(email);
      else if (error.code == "auth/email-already-in-use")
        emailAlreadyInUseNotification(email);
      else if (error.code == "auth/wrong-password")
        toast.error("wrong password");
      else if (error.code == "auth/user-not-found")
        toast.error("user not found");
      else console.error(error);
    });
}

export { signInUser, signOutUser, signUpUserWithEmailPassword };
