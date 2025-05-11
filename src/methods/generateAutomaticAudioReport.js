import axios from "axios";

const audioReportUrls = {
  news: "https://copilot.radiostation.ai/api/news",
  weather: "https://copilot.radiostation.ai/api/weather",
  travel: "https://copilot.radiostation.ai/api/traffic",
};

/**
 * @typedef RequestData
 * @prop {string} voice_code
 * @prop {string} location_code
 * @prop {string} language
 * @prop {string} intro
 * @prop {string} outro
 * @prop {number} number_of_stories
 * @prop {string} script
 */

/**
 *
 * @param {string} segmentName
 * @param {RequestData} requestData
 * @param {(audioUrl)=>void} updateAudioUrl
 * @param {(value)=>void} setLoading
 */
export default async function generateAutomaticAudioReport(
  segmentName,
  requestData,
  updateAudioUrl,
  setLoading = () => {}
) {
  console.log(`generating ${segmentName} audio report...`);
  setLoading(true);

  const requestBody = {
    voice_code: "ZYU3o0m4ibrmH8lXRMon",
    location_code: "no",
    language: "no",
    intro: "",
    outro: "",
    number_of_stories: 1,
    script: "default audio generation please add a script here",
    ...requestData,
  };

  const requestParams = {
    headers: {
      "Cache-Control": "no-cache", // Prevent caching
      Pragma: "no-cache", // Additional no-cache header (for HTTP/1.0 compatibility)
      Expires: "0", // Forces immediate expiration
    },
  };

  axios
    .post(audioReportUrls[segmentName], requestBody, requestParams)
    .then((response) => {
      console.log(`generating ${segmentName} audio report successfull !`);
      updateAudioUrl(response.data.data.audio_url);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
}
