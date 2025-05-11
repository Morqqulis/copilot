import axios from "axios";
import toast from "react-hot-toast";

const previewAudioUrl =
  "https://copilot.radiostation.ai/api/generate_audio_preview";
const uploadAudioUrl = "https://copilot.radiostation.ai/api/upload_audio";

/**
 * @typedef RequestProps
 * @prop {string} script
 * @prop {string} voice
 * @prop {string} location_code
 */

/**
 *
 * @param {string} segmentName
 * @param {RequestProps} requestProps
 * @param {(segmentName, url)=>{}} setAudioUrl
 * @param {(segmentName, value)=>{}} setIsLoading
 */
export default async function exportAudioToCloud(
  segmentName,
  requestProps,
  setAudioUrl,
  setIsLoading
) {
  console.log("getting audio from backend...");
  setIsLoading(true);
  const { location_code } = requestProps;

  const requestBody = {
    voice_code: "ZYU3o0m4ibrmH8lXRMon",
    location_code: "no",
    lang: "no",
    intro: "",
    outro: "",
    number_of_stories: 1,
    script: "default audio generation please add a script here",
    ...requestProps,
  };

  const requestParams = {
    responseType: "blob",
  };

  await axios
    .post(previewAudioUrl, requestBody, requestParams)
    .then(async (response) => {
      console.log("getting audio from backend successful !");
      const blob = response.data;
      uploadToCloud(
        blob,
        segmentName == "travel" ? "traffic" : segmentName,
        location_code,
        setAudioUrl,
        setIsLoading
      );
    })
    .catch((error) => {
      console.error(error);
      toast.error("something went wrong");
      setIsLoading(false);
    });
}

/**
 *
 * @param {Blob} blob
 * @param {string} newsType
 * @param {(audioUrl)=>void} setAudioUrl
 * @param {(isLoading)=>void} setIsLoading
 */
function uploadToCloud(
  blob,
  newsType,
  location_code,
  setAudioUrl,
  setIsLoading
) {
  const formData = new FormData();
  formData.append("file", blob, "audio.mp3");
  formData.append("news_type", newsType);
  formData.append("location_code", location_code);

  setIsLoading(true);
  console.log("uploading audio to cloud...");
  axios
    .post(uploadAudioUrl, formData)
    .then((response) => {
      console.log("uploading audio to cloud successful !");
      const audioUrl = response.data;
      console.log(audioUrl);
      setAudioUrl(audioUrl);
      setIsLoading(false);
      toast.success("file uploaded successfully");
    })
    .catch((error) => {
      console.error(error);
      toast.error("something went wrong");
      setIsLoading(false);
    });
}
