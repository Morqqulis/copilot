import useCopilotStore from '@/stores/useCopilotStore'
import { getApiCountryCode, getLanguageForCountry } from '@/utils/countryUtils'
import axios from 'axios'

const segmentApiEndpoints = {
	news: 'https://copilot.radiostation.ai/api/news_script',
	weather: 'https://copilot.radiostation.ai/api/weather_script',
	travel: 'https://copilot.radiostation.ai/api/traffic_script',
}

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
 * @returns {Promise<Object>} Promise with request result
 */
export default async function getNewsSegmentScript(segmentName, requestData) {
	const updateSegmentStories = useCopilotStore.getState().updateSegmentStories
	const updateSegmentLoading = useCopilotStore.getState().updateSegmentLoading
	const selectedRegion = useCopilotStore.getState().selectedRegion

	console.log(`getting ${segmentName} segment...`)
	updateSegmentLoading(segmentName, true)

	// Get the correct country code for API news/weather/travel
	const countryCode = getApiCountryCode(selectedRegion)
	// Get the appropriate language for the selected country
	const language = getLanguageForCountry(countryCode)

	console.log(`Region: ${selectedRegion}, API country code: ${countryCode}, Language: ${language}`)

	// Basic set of parameters for all APIs
	let requestBody = {
		location_code: countryCode,
		language: language,
		...requestData,
	}
	
	// For news, we need the number of stories
	if (segmentName === 'news' && !requestBody.number_of_stories) {
		requestBody.number_of_stories = 3
	}
	
	// Special handling for travel - add all possible language parameters
	if (segmentName === 'travel') {
		requestBody = {
			...requestBody,
			// Pass all possible variants of the language parameter for compatibility
			lang: language,
			language_code: language,
			language_id: language,
			locale: language,
			loc: language,
			languageCode: language,
			// Pass country parameters
			country: countryCode,
			country_code: countryCode
		}
		console.log('Travel API extended params:', requestBody)
	}
	
	// For weather, also add the lang parameter
	if (segmentName === 'weather') {
		requestBody.lang = language
		console.log('Weather API params:', requestBody)
	}

	// Return a promise for handling by the calling side
	return new Promise(async (resolve, reject) => {
		try {
			// Add timeout for the request
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout
			
			const response = await axios.post(segmentApiEndpoints[segmentName], requestBody, {
				signal: controller.signal
			});
			
			clearTimeout(timeoutId);
			
			const data = response.data.data
			updateSegmentStories(segmentName, formatData(segmentName, data))
			console.log(`getting ${segmentName} segment...successful`)
			updateSegmentLoading(segmentName, false)
			resolve(data)
		} catch (error) {
			// More informative error handling
			let errorMessage = `Error loading: ${segmentName}`;
			
			if (error.name === 'AbortError' || error.code === 'ECONNABORTED') {
				errorMessage = `Request timeout: ${segmentName}`;
				console.error(`Request timeout for ${segmentName}`);
			} else if (error.response) {
				// Server returned a status other than 2xx
				const status = error.response.status;
				errorMessage = `Server error (${status}): ${segmentName}`;
				console.error(`Backend responded with status ${status}:`, error.response.data);
			} else if (error.request) {
				// No response from server
				errorMessage = `No response from server: ${segmentName}`;
				console.error('No response from server:', error.request);
			} else {
				// Something happened in setting up the request
				errorMessage = `Request error: ${segmentName}`;
				console.error('Error setting up request:', error.message);
			}
			
			// Update loading state
			updateSegmentLoading(segmentName, false);
			
			// Add error information to error object
			error.displayMessage = errorMessage;
			reject(error);
		}
	})
}

/**
 * Loads all news segments
 * @returns {Promise<Object>} Promise with results of all requests
 */
export function fetchNews() {
	const selectedRegion = useCopilotStore.getState().selectedRegion
	const countryCode = getApiCountryCode(selectedRegion)
	const language = getLanguageForCountry(countryCode)

	// Pass country and language data
	const requestData = {
		location_code: countryCode,
		language: language,
	}

	console.log('Fetching all segments with params:', requestData)

	// Array for storing results
	const results = {
		news: null,
		weather: null,
		travel: null,
		errors: {}
	}

	// Function for processing each segment individually
	const processSingleSegment = async (segmentName) => {
		try {
			const data = await getNewsSegmentScript(segmentName, requestData)
			results[segmentName] = data
			console.log(`${segmentName} fetched successfully`)
			return { success: true, segmentName, data }
		} catch (error) {
			console.error(`Error fetching ${segmentName}:`, error)
			results.errors[segmentName] = error
			return { success: false, segmentName, error }
		}
	}

	// Run requests sequentially
	return processSingleSegment('news')
		.then(() => processSingleSegment('weather'))
		.then(() => processSingleSegment('travel'))
		.then(() => {
			// Check if there are successful results
			const successSegments = Object.keys(results).filter(
				segment => segment !== 'errors' && results[segment]
			)
			
			// Return results without toast notifications
			return results
		})
}

/**
 *
 * @param {string[]} responseData
 * @returns {NewsItem[]}
 */
function formatData(segmentName, responseData) {
	if (segmentName == 'news')
		return responseData.news_script.map(d => {
			return { content: d, selected: true }
		})

	const data = segmentName == 'weather' ? responseData.weather_script : responseData.traffic_script

	return [{ content: data, selected: true }]
}
