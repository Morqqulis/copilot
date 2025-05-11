import { createContext } from "react";

const SignInToggleContext = createContext({
  toggleSignIn: () => {},
});

export default SignInToggleContext;
