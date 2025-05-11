import axios from "axios";

const urlEndpoint = "https://copilot.radiostation.ai/api/enhance_story";

/**
 * @typedef RequestData
 * @prop {string} story
 * @prop {string} type
 * @prop {string} lang
 */

/**
 *
 * @param {string} segmentName
 * @param {RequestData} requestData
 * @param {(segmentName, content)=>{}} updateSegmentScript
 * @param {(segmentName, value)=>{}} updateSegmentScriptLoading
 */
export default async function enhanceNewsSegmentScript(
  segmentName,
  requestData,
  updateSegmentScript,
  updateSegmentScriptLoading
) {
  console.log("enhancing segment news...");
  updateSegmentScriptLoading(segmentName, true);
  const requestBody = {
    story: "icecream prices gone up",
    type: "news",
    language: "no",
    ...requestData,
  };
  await axios
    .post(urlEndpoint, requestBody)
    .then((response) => {
      updateSegmentScript(segmentName, response.data.data.enhanced_script);
      updateSegmentScriptLoading(segmentName, false);
      console.log("enhancing segment news...successfull !");
    })
    .catch((error) => {
      console.error(error);
      toast.error("something went wrong");
      updateSegmentScriptLoading(segmentName, false);
    });
}
