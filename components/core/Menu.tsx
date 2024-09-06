import { getWordpressMenus } from '@/app/actions'

const renderItems = items => {
	return (
		<ol className="px-4 ps-4">
			{items.map(item => (
				<li key={item.id}>
					<span>{item.name}</span>
					{/* <a href={item.url}>{item.name}</a> */}
					{item.items && item.items.length > 0 && renderItems(item.items)}
				</li>
			))}
		</ol>
	)
}

export default async function Menu() {
	const menus = await getWordpressMenus()

	const primaryLocation = menus?.locations.find(x => x.defaultState === 'default')?.name

	const defaultMenu = menus?.menus.find(x => x.locations.includes(primaryLocation))

	return (
		<div className="flex flex-col gap-4">
			<div>
				<h2 className="text-2xl font-semibold">{defaultMenu.name}</h2>
				{renderItems(defaultMenu.items)}
			</div>
			<pre className="text-[10px]">
				<code>{JSON.stringify(defaultMenu, null, 2)}</code>
				{/* <br />
			<code>{JSON.stringify(menus, null, 2)}</code> */}
			</pre>
		</div>
	)
}
