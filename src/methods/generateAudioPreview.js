import axios from "axios";

const audioGeneratorUrl =
  "https://copilot.radiostation.ai/api/generate_audio_preview";

/**
 * @typedef RequestData
 * @prop {string} voice_code
 * @prop {string} location_code
 * @prop {string} lang
 * @prop {string} intro
 * @prop {string} outro
 * @prop {number} number_of_stories
 * @prop {string} script
 */

/**
 *
 * @param {RequestData} requestData
 * @param {(audioUrl)=>void} updateAudioUrl
 * @param {(value)=>void} setLoading
 */
export default async function generateAudioPreview(
  requestData,
  updateAudioUrl,
  setLoading = () => {}
) {
  console.log("generating preview audio...");
  setLoading(true);

  const requestBody = {
    voice_code: "ZYU3o0m4ibrmH8lXRMon",
    location_code: "no",
    lang: "no",
    intro: "",
    outro: "",
    number_of_stories: 1,
    script: "default audio generation please add a script here",
    ...requestData,
  };

  const requestParams = {
    responseType: "blob",
  };

  axios
    .post(audioGeneratorUrl, requestBody, requestParams)
    .then((response) => {
      console.log("generating preview audio successfull !");
      const audio_url = URL.createObjectURL(response.data);
      updateAudioUrl(audio_url);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      toast.error("something went wrong");
      setLoading(false);
    });
}
