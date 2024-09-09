import { format } from 'date-fns'
import type { Metadata, ResolvingMetadata } from 'next'

import { getAllWordpressPosts, getWordpressPost } from '@/app/actions'
import { siteTitle } from '@/app/meta'

import type { WP_Post } from '../WordpressTypes'

export async function generateStaticParams() {
	const allPosts = await getAllWordpressPosts()

	const slugs: { slug: string }[] = allPosts.map(post => {
		return {
			slug: post.slug,
		}
	})

	// console.log('blog slugs', slugs)

	return slugs
}

type PageProps = {
	params: {
		slug: string
	}
}

export default async function BlogPage({ params }: PageProps) {
	const post: WP_Post = await getWordpressPost(params?.slug || '')

	const publishDate = format(new Date(post.date), 'MMMM d, yyyy')

	return (
		<div className="w-full max-w-4xl gap-2 mb-8 rounded-lg">
			{/* <h1 className="text-3xl font-bold text-zinc-50">Blog</h1> */}
			<h1 className="w-full mb-2 text-3xl font-bold leading-tight tracking-tighter text-center sm:text-4xl md:text-5xl lg:text-6xl text-brand-gray md:leading-none text-balance">
				{post.title}
			</h1>

			<div className="flex flex-row items-center justify-center gap-8 text-brand-muted">
				<span>{publishDate}</span>
				<span>{post.author?.name}</span>
			</div>

			<div className="flex flex-row flex-wrap items-center justify-center gap-1 text-brand-muted">
				{Object.values(post.categories).map(category => (
					<span className="text-xs px-2 py-0.5 border rounded-full text-nowrap" key={category.ID}>
						{category.name}
					</span>
				))}
			</div>

			<a href={post.URL} className="text-brand-fallback hover:text-brand-fallback hover:bg-squiggle">
				WP Link
			</a>
			{/* <p>{params.slug}</p> */}
			<div className="text-left wp-content">
				<div dangerouslySetInnerHTML={{ __html: post.content }} />
			</div>
			{/* <pre className="text-xs text-left whitespace-pre-wrap text-lime-400">
				<code>{JSON.stringify(post, null, 2)}</code>
			</pre> */}
		</div>
	)
}

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
	const post = await getWordpressPost(params?.slug || '')
	if (!post) return {}

	// const previousImages = (await parent).openGraph?.images || []

	// const mainImage = post.mainImage ? urlForSanityImage(post.mainImage).height(630).width(1200).url() : undefined

	return {
		title: post.title,
		description: post.excerpt,
		openGraph: {
			title: post.title,
			description: post.excerpt,
			// images: mainImage ? [mainImage] : previousImages,
			url: `/blog/${post.slug}`,
			type: 'article',
			publishedTime: post.date,
			authors: [post.author?.name!, siteTitle],
		},
	}
}
