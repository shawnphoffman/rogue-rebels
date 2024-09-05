import { Suspense } from 'react'

// import Awards from '@/components/core/Awards'
import LinkCard from '@/components/core/LinkCard'
import Loading from '@/components/core/Loading'
import RatingsApple from '@/components/core/RatingsApple'
import RatingsGoodpods from '@/components/core/RatingsGoodpods'
import RatingsSpotify from '@/components/core/RatingsSpotify'
import Reviews from '@/components/core/Reviews'

import items from './links'

export default async function Home() {
	// await new Promise(resolve => setTimeout(resolve, 2000))
	return (
		<>
			<div className="w-full max-w-4xl text-base leading-normal sm:text-lg">
				Welcome to the Rogue Rebels Podcast! We are a costuming, podcasting, Star Wars loving family who will talk you through our Star Wars
				thoughts from the Films, TV shows, comics, books, and more! Join the Rebellion!
			</div>
			<div className="flex flex-row flex-wrap items-center justify-center gap-2">
				<Suspense fallback={''}>
					<RatingsApple />
					<RatingsGoodpods />
					<RatingsSpotify />
				</Suspense>
			</div>
			<div className="flex flex-row flex-wrap justify-center w-full gap-4">
				{items.map(item => {
					return (
						<LinkCard
							key={item.title}
							title={item.title}
							link={item.href}
							icon={item.icon}
							bg={item.background}
							color={item.color}
						></LinkCard>
					)
				})}
			</div>

			{/* <Suspense>
				<Awards />
			</Suspense> */}

			<Suspense fallback={<Loading />}>
				<Reviews />
			</Suspense>
		</>
	)
}
