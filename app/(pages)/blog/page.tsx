import { Suspense } from 'react'
import { Metadata } from 'next/types'

import { getAllWordpressPosts } from '@/app/actions'
import BlogListClient from '@/components/blog/BlogListClient'

// import { getEpisodes } from '@/app/actions'
// import Episodes from '@/components/core/Episodes'
export const metadata: Metadata = {
	title: 'Blog',
}

// https://public-api.wordpress.com/rest/v1.1/sites/theroguerebels.com/posts/?number=20

export default async function BlogPage() {
	const blogPosts = await getAllWordpressPosts(25)
	return (
		<div className="w-full max-w-3xl p-4 mb-8 rounded-lg ">
			<Suspense>
				<BlogListClient initalPosts={blogPosts} />
			</Suspense>
		</div>
	)
}
