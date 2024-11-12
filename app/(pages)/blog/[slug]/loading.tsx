import { faSpaceStationMoonConstruction } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Loading() {
	return (
		<div className="text-4xl text-blue-500">
			<FontAwesomeIcon icon={faSpaceStationMoonConstruction} beatFade />
		</div>
	)
}
