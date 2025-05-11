import { createContext } from "react";

const ModeContext = createContext({
  screen: "voice",
  updateMode: () => {},
});

export default ModeContext;
