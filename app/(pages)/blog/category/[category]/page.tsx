import { Suspense } from 'react'
import { format } from 'date-fns'
import type { Metadata, ResolvingMetadata } from 'next'

import type { WP_Post } from '@/app/(pages)/blog/WordpressTypes'
import { getAllWordpressPosts, getAllWordpressPostsByCriteria, getWordpressCategory, getWordpressPost } from '@/app/actions'
import { siteTitle } from '@/app/meta'
import BlogListClient from '@/components/blog/BlogListClient'

// export async function generateStaticParams() {
// 	const allPosts = await getAllWordpressPosts()

// 	const slugs: { slug: string }[] = allPosts.map(post => {
// 		return {
// 			slug: post.slug,
// 		}
// 	})

// 	// console.log('blog slugs', slugs)

// 	return slugs
// }

type PageProps = {
	params: {
		category: string
	}
}

export default async function CategoryPage({ params }: PageProps) {
	const categorySlug = params.category
	// const post: WP_Post = await getWordpressPost(params?.category || '')

	const category = await getWordpressCategory(categorySlug)

	const posts = await getAllWordpressPostsByCriteria(category.slug, 25, 0)

	// console.log('categoryPage', {
	// 	category,
	// 	// posts
	// })

	const fetchPromise =
		category.post_count > 20
			? async page => {
					'use server'
					return await getAllWordpressPostsByCriteria(category.slug, 25, page)
			  }
			: async () => {
					'use server'
					new Promise(resolve => setTimeout(resolve, 1000))
			  }

	// const publishDate = format(new Date(post.date), 'MMMM d, yyyy')

	return (
		<div className="flex flex-col w-full max-w-4xl gap-6 mb-8 rounded-lg">
			<h1 className="w-full mb-2 text-3xl font-bold leading-tight tracking-tighter text-center sm:text-4xl md:text-5xl lg:text-6xl text-brand-gray md:leading-none text-balance">
				{category.name}
			</h1>
			<Suspense>
				<BlogListClient initalPosts={posts} fetchPromise={fetchPromise} />
			</Suspense>
		</div>
	)
}

// export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
// 	const post = await getWordpressPost(params?.slug || '')
// 	if (!post) return {}

// 	// const previousImages = (await parent).openGraph?.images || []

// 	// const mainImage = post.mainImage ? urlForSanityImage(post.mainImage).height(630).width(1200).url() : undefined

// 	return {
// 		title: post.title,
// 		description: post.excerpt,
// 		openGraph: {
// 			title: post.title,
// 			description: post.excerpt,
// 			// images: mainImage ? [mainImage] : previousImages,
// 			url: `/blog/${post.slug}`,
// 			type: 'article',
// 			publishedTime: post.date,
// 			authors: [post.author?.name!, siteTitle],
// 		},
// 	}
// }
