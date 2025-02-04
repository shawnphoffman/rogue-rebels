'use server'

import { XMLParser } from 'fast-xml-parser'
import { sanitize } from 'isomorphic-dompurify'

import { appleRatingUrl, rssFeedUrl } from './(pages)/(links)/links'

const wpMenuFields = `ID,locations,menus`
const wpPostFields = `ID,title,author,excerpt,slug,date,categories,content,URL,featured_image,post_thumbnail`

export async function getWordpressMenus() {
	const res = await fetch(`${encodeURI(process.env.WORDPRESS_API_URL!)}/menus/?fields=${wpMenuFields}`, {
		headers: {
			Authorization: `Bearer ${process.env.WORDPRESS_API_KEY}`,
		},
		next: { revalidate: 60 * 60 * 1 },
	})

	const data = await res.json()

	// console.log('getMenus', data.menus[2])
	// console.log('getPost', data)

	return data
}

export async function getWordpressCategories() {
	const res = await fetch(`${process.env.WORDPRESS_API_URL}/categories`, {
		next: { revalidate: 86400 },
	})

	const data = await res.json()

	// console.log('getWordpressCategories', data)

	return data.categories
}

export async function getWordpressCategory(slug: string) {
	const res = await fetch(`${process.env.WORDPRESS_API_URL}/categories/slug:${slug}`)

	const data = await res.json()

	// console.log('getWordpressCategory', data)

	return data
}

export async function getWordpressPost(slug: string) {
	const res = await fetch(`${process.env.WORDPRESS_API_URL}/posts/slug:${slug}`)

	const data = await res.json()

	// console.log('getWordpressPost', data)

	return data
}

export async function getAllWordpressPosts(count = 25, page = 0) {
	const res = await fetch(`${process.env.WORDPRESS_API_URL}/posts/?number=${count}&fields=${wpPostFields}&page=${page + 1}`, {
		next: { revalidate: 360 },
	})

	const data = await res.json()
	// console.log('wp', { count, page, length: data.posts.length, ids: data.posts.map(p => p.ID) })

	return data.posts
}

export async function getAllWordpressPostsByCriteria(categorySlug: string, count = 25, page = 0) {
	let url = `${process.env.WORDPRESS_API_URL}/posts/?number=${count}&fields=${wpPostFields}&page=${page + 1}`
	if (categorySlug) {
		url += `&category=${categorySlug}`
	}
	// if (tag) {
	// 	url += `&tag=${tag}`
	// }
	const res = await fetch(url, {
		next: { revalidate: 360 },
	})

	const data = await res.json()

	// console.log('getAllWordpressPostsByCriteria', { url, data })

	return data.posts
}

export async function getAppleReviews() {
	try {
		const res = await fetch(`https://api.shawn.party/api/pod-data/apple?url=${appleRatingUrl}`, {
			next: { revalidate: 60 * 60 * 1 },
		})
		const data = await res.json()
		const { rating, ratingsUrl, reviews } = data

		return {
			appleRating: rating,
			appleRatingUrl: ratingsUrl,
			reviews: reviews?.length
				? reviews
				: !process.env.VERCEL_URL
				? [
						{
							title: 'Great Show!',
							author: 'Shawn',
							stars: '4',
							text: 'Wow this is a great show! I love it!',
						},
						{
							title: 'Great Show!!',
							author: 'Shawn',
							stars: '3',
							text: 'Wow this is a great show! I love it!',
						},
						{
							title: 'Great Show!!!',
							author: 'Shawn',
							stars: '5',
							text: 'Wow this is a great show! I love it!',
						},
				  ]
				: [],
		}
	} catch (e) {
		console.error(e)
		return {}
	}
}

function removeChaptersAndTimestamps(text) {
	text = sanitize(text, { ALLOWED_TAGS: ['a'] })

	text = text.replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi, (_match, href) => href)

	// const regex1 = /(Chapters|^\d{2}:\d{2}:\d{2}.*)[\r\n]?/gm
	// text = text.replace(regex1, '')

	// const regex2 = /.*(?:https:\/\/justshillin\.com|feedback@justshillin\.com).*/gm
	// text = text.replace(regex2, '')

	// const regex3 = /\b(https?:\/\/\S+)\s+\[\1\]/g
	// text = text.replace(regex3, '$1')

	const regexReplaceNbsp = /&nbsp;/g
	text = text.replace(regexReplaceNbsp, ' ')

	const regexFinal = /[\r\n]{3,}/g
	text = text.replace(regexFinal, '\n').replace(/[\r\n]+\s*$/g, '')

	return text
}

export async function getEpisodes() {
	try {
		// const tempPromise = new Promise(resolve => setTimeout(resolve, 5000))
		const resPromise = fetch(rssFeedUrl, {
			next: { tags: ['episodes'] },
		})
		const [res] = await Promise.all([resPromise])
		const xml = await res.text()
		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: '@_',
		})
		const parsed = parser.parse(xml)
		const episodes = parsed.rss.channel.item.map(ep => ({
			guid: ep.guid['#text'],
			title: ep.title,
			imgSrc: ep['itunes:image']['@_href'],
			summary: removeChaptersAndTimestamps(ep['itunes:summary']),
			link: ep.link,
			pubDate: ep.pubDate,
		}))
		return {
			episodes,
		}
	} catch (error) {
		return {}
	}
}
