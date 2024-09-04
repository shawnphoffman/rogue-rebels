import { toPlainText } from '@portabletext/react'
import slugify from 'slugify'

import { OutlineProps } from '@/sanity/sanity.types-old'

const filter = (ast, match) =>
	ast.reduce((acc, node) => {
		if (match(node)) acc.push(node)
		if (node.children) acc.push(...filter(node.children, match))
		return acc
	}, [])

const findHeadings = ast =>
	filter(ast, node => /h\d/.test(node.style)).map(node => {
		const text = getChildrenText(node)
		const slug = slugify(toPlainText(node))

		return { ...node, text, slug }
	})

const get = (object, path) => path.reduce((prev, curr) => prev[curr], object)
const getObjectPath = path => (path.length === 0 ? path : ['subheadings'].concat(path.join('.subheadings.').split('.')))

export const parseOutline = ast => {
	const outline = { subheadings: [] }
	const headings = findHeadings(ast)
	const path: Number[] = []
	let lastLevel = 0

	headings.forEach(heading => {
		const level = Number(heading.style.slice(1))
		heading.subheadings = []

		if (level < lastLevel) for (let i = lastLevel; i >= level; i--) path.pop()
		else if (level === lastLevel) path.pop()

		const prop = get(outline, getObjectPath(path))
		prop.subheadings.push(heading)
		path.push(prop.subheadings.length - 1)
		lastLevel = level
	})

	return outline.subheadings
}

const getChildrenText = props => props.children.map(node => (typeof node === 'string' ? node : node.text || '')).join('')

const InnerContents = ({ outline }) => (
	<ul className="my-0 space-y-0 text-white list-disc list-inside marker:text-brand-fallback [&_ul]:ps-4">
		{outline.map((heading: OutlineProps) => (
			<li key={heading._key}>
				<a href={'#' + heading.slug} className="text-lg leading-normal text-brand-fallback hover:bg-squiggle hover:text-brand-fallback">
					{getChildrenText(heading)}
				</a>
				{heading.subheadings.length > 0 && <InnerContents outline={heading.subheadings} />}
			</li>
		))}
	</ul>
)

export default function TableOfContents({ content }) {
	const outline: OutlineProps[] = parseOutline(content)
	if (outline.length < 4) return null
	return (
		<div className="w-full p-4 text-left rounded-lg bg-zinc-950/75">
			<div className="text-3xl font-bold text-center underline underline-offset-4 text-brand-fallback decoration-dotted decoration-brand-fallback">
				Table of Contents
			</div>
			<InnerContents outline={outline} />
		</div>
	)
}
