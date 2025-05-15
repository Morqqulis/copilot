import { create } from 'zustand'

const createUserSlice = set => ({
	userData: null,
	updateUserData: newUserData => set({ userData: newUserData }),
	userIsSubscribed: null,
	updateUserIsSubscribed: newSubscriptionState => set({ userIsSubscribed: newSubscriptionState }),
})

const createSettingsSlice = set => ({
	screen: 'news',
	updateMode: newScreen => set({ screen: newScreen }),
	selectedRegion: 'norway',
	updateRegion: newRegion => set({ selectedRegion: newRegion }),
	voice: '',
	setVoice: newVoice => set({ voice: newVoice }),
	isAutomaticMode: false,
	updateAutomaticMode: newMode => set({ isAutomaticMode: newMode }),
	translationLanguage: 'uk',
	setTranslationLanguage: languageCode => set({ translationLanguage: languageCode }),
})

const createStoriesSlice = set => ({
	segmentStories: {
		intro: [
			{
				content: "here's the latest from AI RadioPlayer Newsroom",
				selected: true,
				enhancedContent: "here's the latest from AI RadioPlayer Newsroom",
			},
		],
		news: null,
		weather: null,
		travel: null,
		outro: [
			{
				content: "from AI RadioPlayer, you're up to date",
				selected: true,
				enhancedContent: "from AI RadioPlayer, you're up to date",
			},
		],
	},
	updateSelectedStories: (segmentName, index, newStory) =>
		set(state => ({
			segmentStories: {
				...state.segmentStories,
				[segmentName]: state.segmentStories[segmentName].map((story, i) => (i == index ? newStory : story)),
			},
		})),
	updateSegmentStories: (segmentName, newSegmentData) =>
		set(state => ({
			segmentStories: {
				...state.segmentStories,
				[segmentName]: newSegmentData,
			},
		})),
	updateSegmentLoading: (segmentName, value) =>
		set(state => ({
			isLoadingSegmentStories: {
				...state.isLoadingSegmentStories,
				[segmentName]: value,
			},
		})),
	setVoice: newVoice => set({ voice: newVoice }),
	isLoadingSegmentStories: {
		news: false,
		weather: false,
		travel: false,
	},
})

const createLandingPageSlice = (set, get) => ({
	showSignIn: false,
	toggleSignIn: () => set(state => ({ showSignIn: !state.showSignIn })),
	showDonate: false,
	toggleDonate: () => set(state => ({ showDonate: !state.showDonate })),
	showSubmit: false,
	toggleSubmit: () => set(state => ({ showSubmit: !state.showSubmit })),
})

const useCopilotStore = create((set, get) => ({
	...createUserSlice(set),
	...createSettingsSlice(set),
	...createStoriesSlice(set),
	...createLandingPageSlice(set, get),
}))

export default useCopilotStore
