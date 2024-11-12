import { forwardRef } from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { getWordpressCategories, getWordpressMenus } from '@/app/actions'
import {
	NavigationMenu,
	NavigationMenuContent,
	// NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	// NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

export default async function Menu() {
	// GET IT GOIN
	getWordpressCategories()

	const menus = await getWordpressMenus()
	const categories = await getWordpressCategories()

	// console.log('menus', menus)

	const primaryLocation = menus?.locations.find(x => x.defaultState === 'default')?.name

	const defaultMenu = menus?.menus.find(x => x.locations.includes(primaryLocation))
	// console.log('defaultMenu', defaultMenu)

	const getCategoryDetails = (categoryId: number) => {
		// console.log('getCategoryDetails', categoryId)
		return categories.find(x => x.ID === categoryId)
	}

	return (
		<NavigationMenu>
			<NavigationMenuList className="flex-wrap gap-y-1">
				{defaultMenu.items.map(item => (
					<NavigationMenuItem key={item.id}>
						{item.items && item.items.length > 0 ? (
							<>
								<NavigationMenuTrigger className="font-semibold border">{item.name}</NavigationMenuTrigger>
								<NavigationMenuContent className="py-2 divide-y">
									<ul className="grid w-[400px] gap-1 px-4 py-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
										{item.items.map(subItem => {
											if (subItem.type === 'category') {
												const category = getCategoryDetails(subItem.content_id)
												if (!category) return null
												return (
													<ListItem key={subItem.id} title={subItem.name} href={`/blog/category/${category.slug}`}>
														{/* {category?.description} */}
													</ListItem>
												)
											}
											return null
										})}
									</ul>
									{item.items.map(subItem => {
										if (subItem.type === 'post_tag') {
											return (
												<ul key={subItem.id} className="grid w-[400px] gap-1 px-4 py-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
													{subItem.items ? (
														<>
															<li className="block p-3 space-y-1 leading-none underline transition-colors rounded-md outline-none select-none md:col-span-2">
																<NavigationMenuLink>
																	<div className="text-sm font-medium leading-none">{subItem.name}</div>
																</NavigationMenuLink>
															</li>
															{subItem.items.map(subSubItem => {
																if (subSubItem.type === 'category') {
																	const subCategory = getCategoryDetails(subSubItem.content_id)
																	// console.log('subCategory', subCategory)
																	if (!subCategory) return null
																	return (
																		<ListItem key={subSubItem.id} title={subSubItem.name} href={`/blog/category/${subCategory.slug}`} />
																	)
																}
															})}
														</>
													) : (
														<ListItem key={subItem.id} title={subItem.name} href={`/blog/tag/${subItem.content_id}`} />
													)}
												</ul>
											)
										}
										return null
									})}
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
					{children && <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">{children}</p>}
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = 'ListItem'
