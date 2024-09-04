export default function PostTitle({ children }) {
	return (
		<h1 className="w-full mb-2 text-3xl font-bold leading-tight tracking-tighter text-center sm:text-4xl md:text-5xl lg:text-6xl text-brand-gray md:leading-none text-balance">
			{children}
		</h1>
	)
}
