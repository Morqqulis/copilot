'use client'

import PlaylistItem from '@/atoms/PlaylistItem'
import SpinnerLoader from '@/atoms/SpinnerLoader'
import { fetchNews } from '@/methods/getNewsSegmentScript'
import Dropdown from '@/molecules/Dropdown'
import useCopilotStore from '@/stores/useCopilotStore'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function SidePanelNewsWeather() {
	const segmentStories = useCopilotStore(state => state.segmentStories)
	const isLoadingSegmentStories = useCopilotStore(state => state.isLoadingSegmentStories)
	const updateRegion = useCopilotStore(state => state.updateRegion)
	const selectedRegion = useCopilotStore(state => state.selectedRegion)
	const [regions, setRegions] = useState([])

	// Состояние для управления загрузкой всех сегментов
	const [isLoadingAll, setIsLoadingAll] = useState(false)
	// Состояние для хранения результатов последнего запроса
	const [lastFetchResults, setLastFetchResults] = useState(null)
	// Состояние для хранения ошибок
	const [errorMessages, setErrorMessages] = useState({})

	useEffect(() => {
		axios
			.get('https://copilot.radiostation.ai/api/countries')
			.then(response => {
				setRegions(response.data.data)
			})
			.catch(error => console.error(error))
	}, [])

	const handleRegionChange = (newRegion) => {
		updateRegion(newRegion)
		// Сбрасываем результаты при смене региона
		setLastFetchResults(null)
		setErrorMessages({})
	}

	// Функция для получения всех сегментов
	const fetchAllSegments = () => {
		setIsLoadingAll(true)
		setErrorMessages({})
		console.log('Fetching all segments')
		
		fetchNews()
			.then(results => {
				console.log('All segments fetched:', results)
				setLastFetchResults(results)
				
				// Показываем сообщение об успешных и неуспешных загрузках
				const successSegments = Object.keys(results).filter(
					segment => segment !== 'errors' && results[segment]
				)
				
				if (successSegments.length > 0) {
					const successMessage = `Успешно загружены: ${successSegments.join(', ')}`
					console.log(successMessage)
				}
				
				// Обрабатываем ошибки
				if (results.errors && Object.keys(results.errors).length > 0) {
					const newErrorMessages = {}
					
					// Собираем информативные сообщения об ошибках
					Object.entries(results.errors).forEach(([segmentName, error]) => {
						newErrorMessages[segmentName] = error.displayMessage || `Ошибка загрузки: ${segmentName}`
						console.error(`Error in ${segmentName}:`, error)
					})
					
					setErrorMessages(newErrorMessages)
				}
			})
			.catch(error => {
				console.error('Error fetching segments:', error)
			})
			.finally(() => {
				setIsLoadingAll(false)
			})
	}

	return (
		<div className='w-full'>
			<div className='flex items-center gap-2 mb-3'>
				<Dropdown dropDownValue={selectedRegion} label='Region' options={regions} updateDropdown={handleRegionChange} />
			</div>

			<button
				onClick={fetchAllSegments}
				className='flex justify-center items-center gap-3 bg-cyan-600 hover:bg-cyan-700 mb-5 px-3 py-2 rounded-md w-full whitespace-nowrap'>
				Fetch News & Weather
				<SpinnerLoader
					className={isLoadingAll ? '' : 'hidden'}
				/>
			</button>

			<ul className='flex flex-col gap-4 text-white'>
				{['news', 'weather', 'travel'].map(segmentName => {
					const hasError = errorMessages[segmentName]
					
					return (
						<li key={segmentName} className=''>
							<div className={`flex gap-4 mb-1 px-4 py-1 rounded-md text-center ${hasError ? 'bg-red-900/20' : 'bg-bigBg'}`}>
								<span className='mx-auto uppercase'>{segmentName}</span>
							</div>
							{hasError && (
								<div className='px-4 pb-2 text-red-400 text-xs text-center'>
									{errorMessages[segmentName]}
								</div>
							)}
							<SpinnerLoader className={isLoadingSegmentStories[segmentName] ? 'mx-auto w-6 mb-4' : 'hidden'} />
							<EmptyListPlaceholder segmentName={segmentName} segmentStories={segmentStories} />
							<DisplayNewsSegmentElements segmentName={segmentName} segmentStories={segmentStories} />
						</li>
					)
				})}
			</ul>
		</div>
	)
}

function DisplayNewsSegmentElements({ segmentName, segmentStories }) {
	const newsTable = []

	const newsSegment = segmentStories[segmentName]
	if (!newsSegment) return
	newsSegment.map(({ content, selected }, index) => {
		newsTable.push(
			<PlaylistItem key={content} segmentName={segmentName} content={content} selected={selected} index={index} />,
		)
	})

	return <ul className='flex flex-col gap-2 px-3'>{newsTable}</ul>
}

function EmptyListPlaceholder({ segmentName, segmentStories }) {
	if (segmentStories[segmentName]) return
	return (
		<div className='flex flex-col items-center mx-auto mb-4 w-full text-gray-500 text-sm text-center'>
			<span>fetch news to get scripts</span>
		</div>
	)
}
