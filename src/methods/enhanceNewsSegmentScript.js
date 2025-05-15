import axios from "axios";
import toast from "react-hot-toast";

const urlEndpoint = "https://copilot.radiostation.ai/api/enhance_story";

/**
 * @typedef RequestData
 * @prop {string} story
 * @prop {string} type
 * @prop {string} language
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
  console.log(`Enhancing ${segmentName} segment in language: ${requestData.language || 'not specified'}`);
  updateSegmentScriptLoading(segmentName, true);
  
  const requestBody = {
    story: requestData.story || "default news content",
    type: segmentName || "news",
    language: requestData.language || "en",
  };
  
  await axios
    .post(urlEndpoint, requestBody)
    .then((response) => {
      updateSegmentScript(segmentName, response.data.data.enhanced_script);
      updateSegmentScriptLoading(segmentName, false);
      console.log(`Enhancing ${segmentName} segment... successful!`);
    })
    .catch((error) => {
      console.error(error);
      toast.error("Something went wrong while enhancing content");
      updateSegmentScriptLoading(segmentName, false);
    });
}
