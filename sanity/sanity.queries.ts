import { groq } from 'next-sanity'

const podId = '2e803c28-4870-46c7-90d3-70520ec90af8'

const postFields = groq`
  _id,
  _updatedAt,
  title,
  date,
	publishedAt,
  excerpt,
  mainImage,
	commentsAtUrl,
  "slug": slug.current,
  "author": author->{name, image},
	"categories": categories[]->title,
`

export const postsListQuery =
	process.env.VERCEL_ENV === 'production'
		? groq`
*[_type == "post" && "Just Shillin'" in categories[]->.title] | order(date desc, publishedAt desc) {
  ${postFields}
}`
		: groq`
*[_type == "post"] | order(date desc, publishedAt desc) {
  ${postFields}
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current) && "Just Shillin'" in categories[]->.title][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
	body,
  ${postFields}
}
`

// =======================
// AWARD QUERIES
// =======================
export const AWARDS_QUERY =
	process.env.VERCEL_ENV === 'production'
		? groq`*[_type == "award" && category._ref == "${podId}" && active==true]`
		: groq`*[_type == "award" && category._ref == "${podId}"]`
