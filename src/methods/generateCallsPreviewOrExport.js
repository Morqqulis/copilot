import useCopilotStore from "@/stores/useCopilotStore";
import axios from "axios";

const baseURL = "https://copilot.radiostation.ai/api";

export default async function generateCallsPreviewOrExport(
  isPreview,
  requestData,
  updateAudioUrl,
  setLoading = () => {}
) {
  const voice = useCopilotStore.getState().voice;
  const selectedRegion = useCopilotStore.getState().selectedRegion;
  console.log("generating caller audio...");

  const audioGeneratorUrl = isPreview
    ? `${baseURL}/callers-preview`
    : `${baseURL}/callers-export`;

  setLoading(true);

  const requestBody = isPreview
    ? {
        voiceID: voice,
        voiceCategory: "Caller",
        script: requestData.content,
      }
    : {
        voiceID: voice,
        voiceCategory: "Caller",
        script: requestData.content,
        location_code: selectedRegion,
        filename: "audio.mp3",
      };

  axios
    .post(audioGeneratorUrl, requestBody, {
      responseType: "blob",
    })
    .then((response) => {
      console.log("generating caller audio successfull !");
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
