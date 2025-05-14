import NewsPage from '@/organisms/copilot/NewsPage'
import VoicePage from '@/organisms/copilot/VoicePage'
import CallersPage from '@/organisms/copilot/CallersPage'
import { Toaster } from 'react-hot-toast'

export default function Page() {
	const screen = 'news'

	return (
		<div className='z-50 relative flex justify-start gap-5 bg-zinc-950 w-full h-full min-h-full'>
			{screen == 'news' ? <NewsPage /> : screen == 'voice' ? <VoicePage /> : <CallersPage />}
			<Toaster />
		</div>
	)
}
