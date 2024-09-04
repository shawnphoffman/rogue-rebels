import { Suspense } from 'react'
import { Metadata } from 'next/types'

import { getAllWordpressPosts } from '@/app/actions'

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
			{/* <h1 className="text-3xl font-bold text-zinc-50">Blog</h1> */}
			<Suspense fallback={<p>Loading...</p>}>
				<ul className="flex flex-col items-center justify-center gap-2">
					{blogPosts.map((post: any) => (
						<li key={post.ID} className="flex flex-col gap-2">
							<a href={`/blog/${post.slug}`} className="text-brand-blue hover:text-brand-yellow hover:bg-squiggle">
								{post.title}
								{/* <h2 className="text-xl font-bold ">{post.title}</h2> */}
								{/* <p dangerouslySetInnerHTML={{ __html: post.excerpt }}></p> */}
							</a>
						</li>
					))}
				</ul>
			</Suspense>
		</div>
	)
}
