'use client'

import yellowMicIcon from '@/assets/icons/yellow-mic-icon.svg'
import editIcon from '@/assets/icons/edit-icon.svg'
import Image from 'next/image'
import AudioPlayer from '@/molecules/AudioPlayer'
import { useState } from 'react'
import ScreenWrapper from './ScreenWrapper'

const textAreaEditButtons = [
	{
		icon: editIcon,
		title: 'edit',
	},
	{
		icon: yellowMicIcon,
		title: 'mic',
	},
]

export default function VoicePage() {
	const [previous, setPrevious] = useState({ title: '', artist: '' })
	const [follow, setFollow] = useState({ title: '', artist: '' })
	const [voice, setVoice] = useState('ZYU3o0m4ibrmH8lXRMon')

	function update(key, value) {
		if (key === 'previous') {
			setPrevious(value)
		} else if (key === 'follow') {
			setFollow(value)
		}
	}

	return (
		<>
			{/* <StoriesContext.Provider value={{ voice, setVoice }}> */}
			<ScreenWrapper>
				<div className='flex flex-col items-start gap-6 mx-auto w-[min(48rem,90%)]'>
					<div className='flex justify-between items-center gap-5 w-full'>
						{Song(previous.title, previous.artist)}
						<button className='bg-transparent px-7 py-2 border-2 border-blue-400 rounded-lg text-blue-400 uppercase whitespace-nowrap'>
							generate link
						</button>
					</div>
					<div className='bg-sidePanel p-5 pb-6 border border-red-600 rounded-lg w-full'>
						<textarea
							className='bg-transparent !shadow-none border-none !outline-none !ring-transparent w-full placeholder:text-opacity-80 resize-none'
							name=''
							id=''
							cols='30'
							rows='6'
							placeholder='write something...'></textarea>
						<ul className='flex items-center gap-4'>
							{textAreaEditButtons.map(({ icon, title }) => {
								const iconSize = 20
								return (
									<li key={title}>
										<button className={`bg-bigBg rounded-full px-3 py-2`}>
											<Image src={icon} alt={title} width={iconSize} height={iconSize} />
										</button>
									</li>
								)
							})}
						</ul>
					</div>
					<AudioPlayer />
					{Song(follow.title, follow.artist)}
					<button className='bg-cyan-700 py-2 rounded-lg w-full text-center uppercase'>export audio</button>
				</div>
			</ScreenWrapper>
			{/* </StoriesContext.Provider> */}
		</>
	)
}

function Song(title, artist) {
	return (
		<div className='bg-transparent pl-4 w-full font-medium text-gray-400 capitalize cursor-default'>
			{`${title || 'title'} - ${artist || 'artist'}`}
		</div>
	)
}
