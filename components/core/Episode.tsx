import { faLink } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import slugify from 'slugify'

import EpisodeSummary from './EpisodeSummary'

const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Los_Angeles' } as const

export default function Episodes({ episode }) {
	const pubDate = new Date(episode.pubDate).toLocaleDateString('en-US', options)
	const slug = slugify(episode.title)
	return (
		<article className="flex flex-col justify-start w-full py-4 text-sm text-left" id={episode.guid}>
			<a
				href={`#${slug}`}
				className="cursor-pointer group !text-brand-fallback flex flex-row justify-center items-center mb-2 md:mb-4 gap-1"
			>
				<FontAwesomeIcon className="opacity-0 group-hover:opacity-100" icon={faLink} size="lg" />
				<h2 id={slug} className="text-2xl font-bold text-center text-brand-fallback">
					{episode.title}
				</h2>
			</a>
			<div className="flex flex-col items-center justify-start gap-4 md:flex-row md:items-start">
				<Image src={episode.imgSrc} alt={episode.title} className="w-32 rounded md:w-48 h-fit aspect-square" width={192} height={192} />
				<div className="flex flex-col self-stretch overflow-hidden whitespace-break-spaces text-wrap text-ellipsis">
					<div className="mb-2 text-xs text-white/75">Posted:&nbsp;{pubDate}</div>
					<div className="[&_a]:text-brand-fallback mb-1 [&_a]:pb-0.5 [&_a]:font-bold [&_a:hover]:text-brand-fallback [&_a:hover]:bg-squiggle [&_a]:break-words">
						<EpisodeSummary summary={episode.summary} />
					</div>
					<div className="flex items-end flex-1">
						<a
							className="inline-block text-base font-bold text-brand-fallback hover:text-brand-fallback hover:bg-squiggle"
							target="_blank"
							href={episode.link ? episode.link : 'https://zencastr.com/Just-Shillin'}
						>
							Episode Link
						</a>
					</div>
				</div>
			</div>
		</article>
	)
}
