import { createContext } from "react";

const StoriesContext = createContext({
  segmentStories: {
    intro: { content: "this is an intro", selected: true },
    news: null,
    weather: null,
    travel: null,
    outro: { content: "this is an outro, googbye !", selected: true },
  },
  updateSelectedStories: (segmentName, index, newStory) => {},
  selectedRegion: "norway",
  updateRegion: (region) => {},
  voice: "",
  setVoice: () => {},
  fetchNews: () => {},
  isLoadingSegmentStories: {
    news: false,
    weather: false,
    travel: false,
  },
  isAutomaticMode: false,
  updateAutomaticMode: () => {},
  translateScript: async (scriptText) => {},
  translationLanguage: "uk",
  setTranslationLanguage: (languageCode) => {},
});

export default StoriesContext;
