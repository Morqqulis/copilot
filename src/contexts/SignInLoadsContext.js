import { createContext } from "react";

const SignInLoadContext = createContext({
  isSignInLoad: false,
  setIsSignInLoad: (value) => {},
  closeModal: () => {},
});

export default SignInLoadContext;
