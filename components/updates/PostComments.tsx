import { AppBskyFeedDefs, type AppBskyFeedGetPostThread } from '@atproto/api'
import { faArrowsRepeat, faHeart } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

import { Comment } from './PostComment'

type Props = {
	url?: string
}

async function getPostThread(uri: string) {
	const params = new URLSearchParams({ uri })

	const res = await fetch('https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?' + params.toString(), {
		method: 'GET',
		headers: {
			Accept: 'application/json',
		},
		// cache: 'no-store',
		next: {
			revalidate: 60,
		},
	})

	if (!res.ok) {
		console.error(await res.text())
		return null
	}

	const data = (await res.json()) as AppBskyFeedGetPostThread.OutputSchema

	if (!data || !AppBskyFeedDefs.isThreadViewPost(data.thread)) {
		return null
	}

	return data?.thread
}

export default async function PostComments({ url }: Props) {
	if (!url) return null

	// console.log('url', url)

	const [, , did, _, rkey] = url.split('/')

	const postUrl = `https://bsky.app/profile/${did}/post/${rkey}`

	const thread = await getPostThread(url)

	if (!thread) {
		return null
	}

	return (
		<div className="flex flex-col items-center justify-center w-full max-w-screen-md gap-2 p-4 text-left rounded-lg bg-zinc-950/75">
			{/* STATS */}
			<h2 className="text-2xl font-bold text-center text-brand-fallback" id="comments-section">
				Stats
			</h2>
			<Link href={postUrl} target="_blank" rel="noreferrer noopener" className="group">
				<p className="flex flex-row gap-2">
					<span className="group-hover:text-pink-500">
						{thread.post.likeCount ?? 0} <FontAwesomeIcon icon={faHeart} title={`${thread.post.likeCount ?? 0} likes`} />
					</span>
					<>-</>
					<span className="group-hover:text-green-500">
						{thread.post.repostCount ?? 0} <FontAwesomeIcon icon={faArrowsRepeat} title={`${thread.post.repostCount ?? 0} reposts`} />
					</span>
				</p>
			</Link>
			{!thread.replies || thread.replies.length === 0 ? null : (
				<>
					{/* COMMENTS */}
					<h2 className="text-2xl font-bold text-center text-brand-fallback">Comments</h2>
					<p className="text-sm">
						Comments are fetched directly from{' '}
						<Link href={postUrl} className="underline" target="_blank" rel="noreferrer noopener">
							this post
						</Link>{' '}
						- reply there to add your own comment.
					</p>
					<div className="w-full space-y-8">
						{thread.replies.sort(sortByLikes).map(reply => {
							if (!AppBskyFeedDefs.isThreadViewPost(reply)) return null
							return <Comment key={reply.post.uri} comment={reply} />
						})}
					</div>
				</>
			)}
		</div>
	)
}

const sortByLikes = (a: unknown, b: unknown) => {
	if (!AppBskyFeedDefs.isThreadViewPost(a) || !AppBskyFeedDefs.isThreadViewPost(b)) {
		// blocked/deleted posts are just ignored, so don't sort
		return 0
	}
	return (b.post.likeCount ?? 0) - (a.post.likeCount ?? 0)
}
