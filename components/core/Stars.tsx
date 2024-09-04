import { faStar } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { faStar as faStarDuo } from '@awesome.me/kit-d7ccc5bb1a/icons/duotone/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Stars({ count }) {
	const numStars = Number(count)

	let solidStars: any[] = []
	for (let i = 1; i <= numStars; i++) {
		solidStars.push(<FontAwesomeIcon icon={faStar} key={'star' + i} />)
	}
	let emptyStars: any[] = []
	for (let i = 1; i <= 5 - numStars; i++) {
		emptyStars.push(<FontAwesomeIcon icon={faStarDuo} key={'empty' + i} />)
	}

	return (
		<div className="flex text-brand-fallback flex-nowrap" role="img" aria-label={`Rating: ${numStars}/5 stars`}>
			{solidStars}
			{emptyStars}
		</div>
	)
}
