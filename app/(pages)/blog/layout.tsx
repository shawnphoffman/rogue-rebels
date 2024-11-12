import './blog.css'

import { Suspense } from 'react'

import Menu from '@/components/core/Menu'

export default function BlogLayout({ children }) {
	return (
		<>
			<div className="flex flex-row justify-center w-full text-left">
				<Suspense fallback={<div>Loading menu...</div>}>
					<Menu />
				</Suspense>
			</div>
			{children}
		</>
	)
}
