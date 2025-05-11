import { createContext } from "react";

const VoiceTrackingContext = createContext({
  previous: {},
  follow: {},
  update: (p, v) => {},
  voice: "ZYU3o0m4ibrmH8lXRMon",
  setVoice: () => {},
});

export default VoiceTrackingContext;
