import { createContext } from "react";

const UserContext = createContext({
  userData: {},
  userIsSubscribed: null,
  signOutUser: () => {},
  signInUser: () => {},
  updateUserData: () => {},
  signUpUserWithEmailPassword: () => {},
  goToPremium: () => {},
  getPremiumStatus: () => {},
  getPortalUrl: () => {},
});

export default UserContext;
