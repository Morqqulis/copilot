import axios from "axios";

const onOffUrls = {
  on: "https://copilot.radiostation.ai/auto_on",
  off: "https://copilot.radiostation.ai/auto_off",
};

export default async function turnOnOffAutomaticMode(mode) {
  const url = onOffUrls[mode];

  axios
    .post(url)
    .then(() => {
      console.log(`automatic mode is ${mode}.`);
    })
    .catch((error) => {
      console.error(error);
    });
}
