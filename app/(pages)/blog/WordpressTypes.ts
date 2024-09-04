interface Author {
	ID: number
	login: string
	email: boolean
	name: string
	first_name: string
	last_name: string
	nice_name: string
	URL: string
	avatar_URL: string
	profile_URL: string
	site_ID: number
}

interface Discussion {
	comments_open: boolean
	comment_status: string
	pings_open: boolean
	ping_status: string
	comment_count: number
}

interface PostThumbnail {
	ID: number
	URL: string
	guid: string
	mime_type: string
	width: number
	height: number
}

interface Terms {
	category: {
		[key: string]: {
			ID: number
			name: string
			slug: string
			description: string
			post_count: number
			parent: number
			meta: {
				links: {
					self: string
					help: string
					site: string
				}
			}
		}
	}
	post_tag: {
		[key: string]: {
			ID: number
			name: string
			slug: string
			description: string
			post_count: number
			meta: {
				links: {
					self: string
					help: string
					site: string
				}
			}
		}
	}
}

interface Tags {
	[key: string]: {
		ID: number
		name: string
		slug: string
		description: string
		post_count: number
		meta: {
			links: {
				self: string
				help: string
				site: string
			}
		}
	}
}

interface Categories {
	[key: string]: {
		ID: number
		name: string
		slug: string
		description: string
		post_count: number
		parent: number
		meta: {
			links: {
				self: string
				help: string
				site: string
			}
		}
	}
}

interface Metadata {
	id: string
	key: string
	value: string | Record<string, unknown>
}

interface Meta {
	links: {
		self: string
		help: string
		site: string
		replies: string
		likes: string
	}
}

interface Capabilities {
	publish_post: boolean
	delete_post: boolean
	edit_post: boolean
}

export interface WP_Post {
	ID: number
	site_ID: number
	author: Author
	date: string
	modified: string
	title: string
	URL: string
	short_URL: string
	content: string
	excerpt: string
	slug: string
	guid: string
	status: string
	sticky: boolean
	password: string
	parent: boolean
	type: string
	discussion: Discussion
	likes_enabled: boolean
	sharing_enabled: boolean
	like_count: number
	i_like: boolean
	is_reblogged: boolean
	is_following: boolean
	global_ID: string
	featured_image: string
	post_thumbnail: PostThumbnail
	format: string
	geo: boolean
	menu_order: number
	page_template: string
	publicize_URLs: any[]
	terms: Terms
	tags: Tags
	categories: Categories
	attachments: any
	attachment_count: number
	metadata: Metadata[]
	meta: Meta
	capabilities: Capabilities
	other_URLs: any
}
