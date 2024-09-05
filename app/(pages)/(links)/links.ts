import { faAmazon, faBluesky, faSpotify, faYoutube } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/brands'
import { faAt, faRssSquare } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { faPodcast } from '@awesome.me/kit-d7ccc5bb1a/icons/duotone/solid'
import {
	faGoodpods,
	faOvercast,
	faPocketCasts,
	faRadioPublic,
	faYoutubeMusic,
	faZencastr,
} from '@awesome.me/kit-d7ccc5bb1a/icons/kit/custom'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export const applePodcastId = '1435216156'
export const applePodcastUrl = `https://podcasts.apple.com/us/podcast/id${applePodcastId}`
export const appleRatingUrl = `${applePodcastUrl}?see-all=reviews`
export const goodpodsUrl = 'https://goodpods.com/podcasts/rogue-rebels-podcast-a-star-wars-family-pod-327016'
export const rssFeedUrl = 'https://anchor.fm/s/4fe27918/podcast/rss'
export const spotifyId = '1NHmHNk8Uode7Y5sJ0i5Gq'
export const spotifyUrl = `https://open.spotify.com/show/${spotifyId}`

type LinkItem = {
	title: string
	href: string
	icon: IconDefinition
	background: string
	color?: string
}

const items: LinkItem[] = [
	{
		title: 'Apple Podcasts',
		href: applePodcastUrl,
		icon: faPodcast,
		background: 'bg-applepodcasts',
	},
	{
		title: 'Spotify',
		href: spotifyUrl,
		icon: faSpotify,
		background: 'bg-spotify',
	},
	// {
	// 	title: 'Email',
	// 	href: 'mailto:feedback@justshillin.com',
	// 	icon: faAt,
	// 	background: 'bg-email',
	// },
	{
		title: 'Overcast',
		href: `https://overcast.fm/itunes${applePodcastId}`,
		icon: faOvercast,
		background: 'bg-overcast',
	},
	// {
	// 	title: 'YouTube',
	// 	href: 'https://www.youtube.com/@JustShillin',
	// 	icon: faYoutube,
	// 	background: 'bg-youtube',
	// },
	// {
	// 	title: 'YouTube Music',
	// 	href: 'https://music.youtube.com/playlist?list=PLRxEa7NQRmKFKsoGeQBLb_IGNcFRZoBp1',
	// 	icon: faYoutubeMusic,
	// 	background: 'bg-youtube',
	// },
	{
		title: 'Goodpods',
		href: goodpodsUrl,
		icon: faGoodpods,
		background: 'bg-goodpods',
		color: 'text-black',
	},
	// {
	// 	title: 'Amazon Music',
	// 	href: 'https://music.amazon.com/podcasts/41b5996a-f09d-4657-991f-d495150756f3/just-shillin',
	// 	icon: faAmazon,
	// 	background: 'bg-amazonmusic',
	// },
	// {
	// 	title: 'Pocket Casts',
	// 	href: 'https://pca.st/74wq5erg',
	// 	icon: faPocketCasts,
	// 	background: 'bg-pocketcasts',
	// },
	// {
	// 	title: 'Radio Public',
	// 	href: 'https://radiopublic.com/just-shillin-6pQpmN',
	// 	icon: faRadioPublic,
	// 	background: 'bg-radiopublic',
	// },
	// {
	// 	title: 'Zencastr',
	// 	href: 'https://zencastr.com/Just-Shillin',
	// 	icon: faZencastr,
	// 	background: 'bg-zencastr',
	// },
	{
		title: 'RSS',
		href: rssFeedUrl,
		icon: faRssSquare,
		background: 'bg-rss',
	},
	// {
	// 	title: 'BlueSky Feed',
	// 	href: 'https://bsky.app/profile/did:plc:q7ul4lz2j3d6qtcjzvz4rrjh/feed/shawnbot-pods',
	// 	icon: faBluesky,
	// 	background: 'bg-bluesky',
	// },
] as const

export default items
