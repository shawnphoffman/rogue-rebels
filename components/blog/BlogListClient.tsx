'use client'

import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { format, set } from 'date-fns'
import { sanitize } from 'isomorphic-dompurify'
import Image from 'next/image'
import Link from 'next/link'

import { WP_Post } from '@/app/(pages)/blog/WordpressTypes'
import { getAllWordpressPosts } from '@/app/actions'
import Loading from '@/components/core/Loading'

const NUMBER_TO_FETCH = 25

const fetchPromiseExample = async page => {
	return await getAllWordpressPosts(NUMBER_TO_FETCH, page)
}

export default function BlogListClient({ initalPosts, fetchPromise = fetchPromiseExample }) {
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	const [more, setMore] = useState(true)
	const [blogPosts, setBlogPosts] = useState(initalPosts)
	const { ref, inView } = useInView({ delay: 1500, rootMargin: '200px' })

	const loadMore = useCallback(async () => {
		setLoading(true)
		const apiBlogPosts = await fetchPromise(page)
		console.log('apiBlogPosts', apiBlogPosts)
		setLoading(false)
		if (!apiBlogPosts || apiBlogPosts.length === 0) {
			setMore(false)
			return
		}
		setBlogPosts(() => [...blogPosts, ...apiBlogPosts])
		setPage(() => page + 1)
	}, [blogPosts, fetchPromise, page])

	useEffect(() => {
		if (inView && !loading && more) {
			loadMore()
		}
	}, [inView, loadMore, loading, more])

	return (
		<ul className="flex flex-col items-center justify-center gap-2 text-left">
			{blogPosts.map((post: WP_Post) => (
				<li key={post.ID} className="flex flex-col w-full gap-2">
					<Link
						href={`/blog/${post.slug}`}
						className="flex flex-row justify-between w-full gap-4 pb-2 border-b text-brand-gray"
						suppressHydrationWarning
					>
						<Image
							src={post.post_thumbnail.URL}
							alt={post.title}
							width={200}
							// height={parseFloat((post.post_thumbnail.height * (200 / post.post_thumbnail.width)).toFixed(1))}
							// height={Math.round(post.post_thumbnail.height * (200 / post.post_thumbnail.width) * 10) / 10}
							// Rounding is dumb with Next
							height={Math.round(post.post_thumbnail.height * (200 / post.post_thumbnail.width))}
							className="h-fit rounded aspect-auto max-w-[200px] w-[200px]"
						/>
						<div className="flex flex-col items-start justify-start flex-1 gap-1 " suppressHydrationWarning>
							<div
								className="text-xl font-semibold text-brand-gray"
								dangerouslySetInnerHTML={{ __html: sanitize(`${post.ID} - ${post.title}`) }}
							></div>
							<div className="flex flex-row gap-4 text-sm text-brand-muted">
								<span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
								<span>{post.author.name}</span>
							</div>
							<div className="text-pretty" dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
						</div>
					</Link>
				</li>
			))}
			{more && (
				<div ref={ref}>
					<Loading />
				</div>
			)}
		</ul>
	)
}
