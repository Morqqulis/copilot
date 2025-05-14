'use client'

import translateIcon from '@/assets/icons/translate.svg'
import yellowMicIcon from '@/assets/icons/yellow-mic-icon.svg'
import editIcon from '@/assets/icons/edit-icon.svg'
import Image from 'next/image'
import { useRef, useState } from 'react'
import saveIcon from '@/assets/icons/save-icon.svg'
import SpinnerLoader from '@/atoms/SpinnerLoader'
import AudioPlayer from './AudioPlayer'
import generateAudioPreview from '@/methods/generateAudioPreview'
import toast from 'react-hot-toast'
import useCopilotStore from '@/stores/useCopilotStore'
import { translateScript } from '@/methods/translateMethods'
import { BorderBeam } from '@/components/ui/border-beam'

const titles = {
	intro: 'intro',
	news: 'news',
	weather: 'weather',
	travel: 'travel',
	outro: 'outro',
}

export default function ManualAudioSection({ segmentName, index }) {
	const updateSelectedStories = useCopilotStore(state => state.updateSelectedStories)
	const voice = useCopilotStore(state => state.voice)
	const segmentStories = useCopilotStore(state => state.segmentStories)
	const [isEditing, setIsEditing] = useState(false)
	const textAreaRef = useRef(null)
	const [isFetchingAudio, setIsFetchingAudio] = useState(false)
	const [previewAudioUrl, setPreviewAudioUrl] = useState(null)
	const enhancedContent = segmentStories[segmentName][index].enhancedContent
	if (textAreaRef.current) textAreaRef.current.value = enhancedContent

	function handleEdit() {
		if (isEditing) {
			textAreaRef.current.disabled = true
			const value = textAreaRef.current.value
			const newStory = {
				...segmentStories[segmentName][index],
				enhancedContent: value,
				content: value,
			}
			updateSelectedStories(segmentName, index, newStory)
		} else {
			textAreaRef.current.disabled = false
			const textLength = textAreaRef.current.value.length
			textAreaRef.current.focus()
			textAreaRef.current.setSelectionRange(textLength, textLength)
		}
		setIsEditing(prev => !prev)
	}

	function previewAudio() {
		generateAudioPreview(
			{
				voice_code: voice,
				script: enhancedContent,
			},
			setPreviewAudioUrl,
			setIsFetchingAudio,
		)
	}

	async function translateManualAudioScript() {
		try {
			setIsFetchingAudio(true)
			const newText = await translateScript(textAreaRef.current.value)
			if (!newText) return
			const value = newText
			const newStory = {
				...segmentStories[segmentName][index],
				enhancedContent: value,
				content: value,
			}
			setIsFetchingAudio(false)
			updateSelectedStories(segmentName, index, newStory)
		} catch (error) {
			toast.error('something went wrong')
			setIsFetchingAudio(false)
			console.error(error)
		}
	}

	const textAreaEditButtons = [
		{
			icon: isEditing ? saveIcon : editIcon,
			title: 'edit',
			onClickHandle: handleEdit,
			className: '',
		},
		{
			icon: yellowMicIcon,
			title: 'mic',
			onClickHandle: previewAudio,
			className: '',
		},
		{
			icon: translateIcon,
			title: 'translate',
			onClickHandle: translateManualAudioScript,
			className: '',
		},
	]

	return (
		<div className='w-full text-white'>
			<div className='flex justify-between items-center mb-4'>
				<h2 className='capitalize'>{titles[segmentName]}</h2>
			</div>
			<div className={`relative border overflow-hidden p-3 rounded-xl border-zinc-800`}>
				<div className='bg-sidePanel p-5 pb-6 rounded-lg w-full'>
					<textarea
						disabled={!isEditing}
						ref={textAreaRef}
						className='bg-transparent !shadow-none border-none !outline-none !ring-transparent w-full resize-none'
						name=''
						id=''
						cols='30'
						rows='6'
						defaultValue={enhancedContent}></textarea>
					<ul className='flex items-center gap-4'>
						{textAreaEditButtons.map(({ icon, title, onClickHandle }) => {
							const iconSize = 20
							return (
								<li key={title}>
									<button
										disabled={isFetchingAudio}
										onClick={onClickHandle}
										className={`bg-bigBg rounded-full aspect-square px-3 py-2`}>
										{isFetchingAudio ? (
											<SpinnerLoader className={'w-5'} />
										) : (
											<Image src={icon} alt={title} width={iconSize} height={iconSize} />
										)}
									</button>
								</li>
							)
						})}
					</ul>
				</div>
				<BorderBeam duration={6} size={400} className='from-transparent via-red-500 to-transparent' />
				<BorderBeam duration={6} delay={3} size={400} className='from-transparent via-blue-500 to-transparent' />
			</div>

			<AudioPlayer src={previewAudioUrl} />
		</div>
	)
}
