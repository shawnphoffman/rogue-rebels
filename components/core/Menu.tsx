import { forwardRef } from 'react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { getWordpressMenus } from '@/app/actions'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

export default async function Menu() {
	const menus = await getWordpressMenus()

	// console.log('menus', menus)

	const primaryLocation = menus?.locations.find(x => x.defaultState === 'default')?.name

	const defaultMenu = menus?.menus.find(x => x.locations.includes(primaryLocation))
	console.log('defaultMenu', defaultMenu)

	return (
		<NavigationMenu>
			<NavigationMenuList className="flex-wrap gap-y-1">
				{defaultMenu.items.map(item => (
					<NavigationMenuItem key={item.id}>
						{item.items && item.items.length > 0 ? (
							<>
								<NavigationMenuTrigger className="font-semibold border">{item.name}</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid w-[400px] gap-1 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
										{item.items.map(subItem => (
											<ListItem key={subItem.id} title={subItem.name} href={subItem.url} />
										))}
									</ul>
								</NavigationMenuContent>
							</>
						) : (
							<Link href={item.url} legacyBehavior passHref>
								<NavigationMenuLink className={twMerge(navigationMenuTriggerStyle(), 'font-semibold border')}>
									{item.name}
								</NavigationMenuLink>
							</Link>
						)}
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	)
}

const ListItem = forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={twMerge(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					{/* <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">{children}</p> */}
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = 'ListItem'
