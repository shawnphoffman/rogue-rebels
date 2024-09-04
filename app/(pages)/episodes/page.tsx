import { Metadata } from 'next/types'

import { getEpisodes } from '@/app/actions'
import Episodes from '@/components/core/Episodes'
export const metadata: Metadata = {
	title: 'Episodes',
}

// NOTE Loading.tsx wraps Pages in Suspense but it seems to only work when it is nested and not the root Loading component

export default async function EpisodesPage() {
	const data = await getEpisodes()

	return (
		<div className="w-full max-w-3xl p-4 mb-8 border rounded-lg ">
			<Episodes episodes={data.episodes} />
		</div>
	)
}
