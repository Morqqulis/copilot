import useCopilotStore from "@/stores/useCopilotStore";
import axios from "axios";
import toast from "react-hot-toast";

const segmentApiEndpoints = {
  news: "https://copilot.radiostation.ai/api/news_script",
  weather: "https://copilot.radiostation.ai/api/weather_script",
  travel: "https://copilot.radiostation.ai/api/traffic_script",
};

/**
 * @typedef NewsItem
 * @prop {string} content
 * @prop {boolean} selected
 */

/**
 * @typedef RequestData
 * @prop {string} location_code
 * @prop {string} lang
 * @prop {number} number_of_stories
 * @prop {string} voice_code
 */

/**
 *
 * @param {string} segmentName
 * @param {RequestData} requestData
 * @param {(segmentName, NewsItem[])=>void} updateSegmentStories
 * @param {(segmentName, value)=>void} setIsLoadingStories
 * @returns {string}
 */
export default async function getNewsSegmentScript(segmentName, requestData) {
  const updateSegmentStories = useCopilotStore.getState().updateSegmentStories;
  const updateSegmentLoading = useCopilotStore.getState().updateSegmentLoading;
  console.log(`getting ${segmentName} segment...`);
  updateSegmentLoading(segmentName, true);
  const requestBody = {
    location_code: "no",
    language: "no",
    number_of_stories: 1,
    ...requestData,
  };
  await axios
    .post(segmentApiEndpoints[segmentName], requestBody)
    .then((response) => {
      const data = response.data.data;
      updateSegmentStories(segmentName, formatData(segmentName, data));
      console.log(`getting ${segmentName} segment...successful`);
      updateSegmentLoading(segmentName, false);
      return data;
    })
    .catch((error) => {
      toast.error("something went wrong");
      updateSegmentLoading(segmentName, false);
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Backend responded:", error.response.data);
      } else if (error.request) {
        // No response from the server
        console.error("No response from server:", error.request);
      } else {
        // Something happened in setting up the request
        console.error("Error setting up request:", error.message);
      }
    });
}

export function fetchNews() {
  getNewsSegmentScript("news", {});
  getNewsSegmentScript("weather", {});
  getNewsSegmentScript("travel", {});
}

/**
 *
 * @param {string[]} responseData
 * @returns {NewsItem[]}
 */
function formatData(segmentName, responseData) {
  if (segmentName == "news")
    return responseData.news_script.map((d) => {
      return { content: d, selected: true };
    });

  const data =
    segmentName == "weather"
      ? responseData.weather_script
      : responseData.traffic_script;

  return [{ content: data, selected: true }];
}
