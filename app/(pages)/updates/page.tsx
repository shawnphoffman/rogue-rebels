import { Metadata } from 'next/types'

import PostRow from '@/components/updates/PostRow'
import { getAllPosts } from '@/sanity/sanity.requests'
import { POST_QUERYResult } from '@/sanity/sanity.types'
export const metadata: Metadata = {
	title: 'Updates',
}

export default async function UpdatesPage() {
	const posts = await getAllPosts()

	return (
		<div className="w-full max-w-3xl mb-8 border rounded-lg border-zinc-900 bg-zinc-950/75">
			<div className="flex flex-col justify-center w-full p-2 divide-y divide-brand-blue" aria-label="Podcast Updates">
				{posts.map(post => {
					return <PostRow key={post._id} post={post as NonNullable<POST_QUERYResult>} />
				})}
			</div>
		</div>
	)
}
