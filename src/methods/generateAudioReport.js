import axios from "axios";

const audioReportUrls = {
  new: "https://copilot.radiostation.ai/api/news",
  weather: "https://copilot.radiostation.ai/api/weather",
  travel: "https://copilot.radiostation.ai/api/traffic",
};

/**
 * @typedef RequestData
 * @prop {string} voice_code
 * @prop {string} location_code
 * @prop {string} lang
 * @prop {string} intro
 * @prop {string} outro
 * @prop {number} number_of_stories
 */

/**
 *
 * @param {RequestData} requestData
 * @param {(audioUrl)=>void} setAudioUrl
 * @param {(value)=>void} setLoading
 */
export default async function generateAudioReport(
  segmentName,
  requestData,
  setAudioUrl,
  setLoading = () => {}
) {
  console.log("fetching audio report...");
  setLoading(true);

  const requestBody = {
    voice_code: "ZYU3o0m4ibrmH8lXRMon",
    location_code: "no",
    lang: "no",
    intro: "",
    outro: "",
    number_of_stories: 1,
    ...requestData,
  };

  axios
    .post(audioReportUrls[segmentName], requestBody)
    .then((response) => {
      console.log("fetching audio report successfull !");
      const { audio_url } = response.data;
      setAudioUrl(audio_url);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      toast.error("something went wrong");
      setLoading(false);
    });
}
