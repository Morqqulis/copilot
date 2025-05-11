'use client'
import React, { useEffect } from 'react'
import Footer from '@/organisms/Footer'
import BackToTopButton from '@/atoms/BackToTopButton'
import ArticleOptionsContext from '@/contexts/ArticleOptionsContext'
import ActiveCategoriesContext from '@/contexts/ActiveCategoriesContext'
import getStoredLocalData from '@/methods/getStoredLocalData'
import { Toaster } from 'react-hot-toast'
import LandingNav from '@/atoms/LandingNav'
import LandingHero from '@/atoms/LandingHero'
import LandingPricing from '@/molecules/LandingPricing'
import LandingFeatures from '@/molecules/LandingFeatures'
import LandingCallToAction from '@/atoms/LandingCallToAction'
import SignInModal from '@/molecules/SignInModal'
import SignInToggleContext from '@/contexts/SignInToggleContext'
import { ShootingStars } from '@/components/ui/shooting-stars'

const defaultCategoryStates = {
	world: true,
	nation: true,
	business: true,
	technology: true,
	entertainment: true,
	sports: true,
	science: true,
	health: true,
	crypto: true,
}

const defaultArticleOpions = {
	selectedEdition: 'us',
	showImages: false,
	headerTop: false,
	mode: 'grid',
	itemsPerCategory: 10,
	newTab: true,
}

export default function Main() {
	const [activeCategories, setActiveCategories] = React.useState(defaultCategoryStates)
	const [articlesOptions, setArticlesOptions] = React.useState(defaultArticleOpions)
	const [showSignIn, setShowSignIn] = React.useState(false)

	function toggleSignIn() {
		setShowSignIn(prev => !prev)
	}

	useEffect(() => {
		getStoredLocalData('activeCategories', setActiveCategories)
		getStoredLocalData('articlesOptions', setArticlesOptions)
	}, [])

	/**
	 *
	 * @param {string} param
	 * @param {*} value
	 */
	function updateOptions(param, value) {
		setArticlesOptions(prev => {
			if (typeof window !== 'undefined')
				localStorage.setItem('articlesOptions', JSON.stringify({ ...prev, [param]: value }))
			return { ...prev, [param]: value }
		})
	}

	/**
	 * @param {string} category
	 */
	function changeCategoryState(category, all = false) {
		if (!all)
			setActiveCategories(prev => {
				const prevCopy = JSON.parse(JSON.stringify(prev))
				prevCopy[category] = !prevCopy[category]
				if (typeof window !== 'undefined') localStorage.setItem('activeCategories', JSON.stringify(prevCopy))
				return { ...prevCopy }
			})
		else
			setActiveCategories(prev => {
				for (const [key] of Object.entries(prev)) {
					if (key === category) prev[key] = true
					else prev[key] = false
				}
				if (typeof window !== 'undefined') localStorage.setItem('activeCategories', JSON.stringify(prev))
				return { ...prev }
			})
	}

	return (
		<main className='relative flex flex-col justify-between bg-[#000000] w-full min-h-screen overflow-hidden text-white'>
			{/* Background with stars */}
			<div className='z-0 absolute inset-0'>
				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(0,0,0,0)_80%)]' />
				<div className='absolute inset-0 stars' />
			</div>

			{/* Shooting stars with more extreme values for visibility */}
			<ShootingStars
				starColor='#FF0000'
				trailColor='#FFFFFF'
				minSpeed={5} // Slower speed for debugging
				maxSpeed={10}
				minDelay={2000} // Longer delay for debugging
				maxDelay={3000}
				starWidth={100} // Much bigger for debugging
				starHeight={20}
				className='z-[1] pointer-events-none'
			/>

			{/* Main content */}
			<div className='z-10 relative'>
				<ArticleOptionsContext.Provider value={{ articlesOptions, updateOptions }}>
					<ActiveCategoriesContext.Provider value={{ activeCategories, changeCategoryState }}>
						<SignInToggleContext.Provider value={{ toggleSignIn }}>
							<div className='mx-auto w-[min(90%,75rem)]'>
								<LandingNav toggleSignIn={toggleSignIn} />
								<LandingHero />
								<LandingPricing />
								<LandingFeatures />
								<LandingCallToAction />
							</div>
							<SignInModal showSignIn={showSignIn} toggleSignIn={toggleSignIn} />
							<BackToTopButton />
							<Footer />
							<Toaster
								position='bottom-right'
								toastOptions={{
									className: 'rounded-xl bg-zinc-800 text-white',
									style: {
										border: '1px solid rgba(255, 255, 255, 0.1)',
									},
								}}
							/>
						</SignInToggleContext.Provider>
					</ActiveCategoriesContext.Provider>
				</ArticleOptionsContext.Provider>
			</div>

			<style jsx>{`
				.stars {
					background-image: radial-gradient(4px 4px at 20px 30px, #fff, rgba(0, 0, 0, 0)),
						radial-gradient(4px 4px at 40px 70px, #fff, rgba(0, 0, 0, 0)),
						radial-gradient(4px 4px at 50px 160px, #fff, rgba(0, 0, 0, 0)),
						radial-gradient(4px 4px at 90px 40px, #fff, rgba(0, 0, 0, 0)),
						radial-gradient(4px 4px at 130px 80px, #fff, rgba(0, 0, 0, 0)),
						radial-gradient(4px 4px at 160px 120px, #fff, rgba(0, 0, 0, 0));
					background-repeat: repeat;
					background-size: 200px 200px;
					animation: twinkle 5s ease-in-out infinite;
					opacity: 0.9;
				}

				@keyframes twinkle {
					0% {
						opacity: 0.7;
					}
					50% {
						opacity: 1;
					}
					100% {
						opacity: 0.7;
					}
				}
			`}</style>
		</main>
	)
}
