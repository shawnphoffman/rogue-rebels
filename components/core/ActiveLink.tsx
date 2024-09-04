'use client'

import classnames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
	label: string
	href: string
	fuzzy?: boolean
}

const ActiveLink = ({ label, href, fuzzy, ...rest }: Props) => {
	const currentRoute = usePathname()
	const isActive = fuzzy ? currentRoute.toLowerCase().startsWith(href) : currentRoute === href

	const conditionalClasses = classnames(
		isActive ? 'underline underline-offset-[6px] decoration-[1px] text-brand-blue' : 'text-zinc-500 hover:text-brand-red'
	)

	return (
		<Link
			{...rest}
			href={href}
			className={`bg-[length:auto_36px] leading-none bg-repeat text-lg bg-bottom font-bold whitespace-nowrap cursor-pointer ${conditionalClasses}`}
		>
			{label}
		</Link>
	)
}

export default ActiveLink
