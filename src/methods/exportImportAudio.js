import getNewsSegmentScript from "./getNewsSegmentScript";
import enhanceNewsSegmentScript from "./enhanceNewsSegmentScript";
import generateAudioPreview from "./generateAudioPreview";
import downloadAudioFile from "./downloadAudioFile";
import exportAudioToCloud from "./exportAudioToCloud";

/**
 * @typedef RequestData
 * @prop {string} service
 * @prop {string} location
 * @prop {string} script
 */

/**
 *
 * @param {string} segmentName
 * @param {RequestData} requestData
 * @param {(segmentName,audioUrl)=>{}} setAudioUrl
 * @param {(segmentName,value)=>{}} setIsLoading
 */
export default async function exportImportAudio(
  method,
  requestData,
  setIsLoading
) {
  generateAudioPreview(
    requestData,
    (audioUrl) => {
      if (method == "download") {
        downloadAudioFile(audioUrl, setIsLoading);
      } else {
        const { service, location } = requestData;
        exportAudioToCloud(audioUrl, requestData, () => {}, setIsLoading);
      }
    },
    setIsLoading
  );
}
