import { faArrowRight } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { faAndy2, faShawn2 } from '@awesome.me/kit-d7ccc5bb1a/icons/kit/custom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center max-w-2xl gap-8 p-4 mx-auto text-white h-dvh w-dvw">
			<div className="flex flex-col w-full gap-2">
				<h1 className="text-6xl font-bold text-brand-fallback">Uh oh...</h1>
				<h2 className="text-xl text-white/80">These aren&apos;t the droids you&apos;re looking for...</h2>
				<Link
					href="/"
					className="flex flex-row items-center justify-center gap-2 text-2xl font-bold group hover:text-brand-fallback text-brand-fallback w-fit"
				>
					<span className="group-hover:bg-squiggle">Return to safety</span>
					<FontAwesomeIcon icon={faArrowRight} />
				</Link>
			</div>
			<div className="text-brand-fallback animate-pulse text-[8rem] sm:text-[20rem] flex flex-row gap-4 justify-center flex-wrap">
				<FontAwesomeIcon icon={faAndy2} />
				<FontAwesomeIcon icon={faShawn2} />
			</div>
		</div>
	)
}
