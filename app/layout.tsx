import '@/app/global.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { Analytics } from '@vercel/analytics/react'
import { GeistSans } from 'geist/font/sans'

// import Image from 'next/image'
import { siteDescription, siteTitle, siteUrl } from '@/app/meta'
// import headerImage from '@/app/title.png'
import ActiveLink from '@/components/core/ActiveLink'
import RandomHeader from '@/components/core/RandomHeader'
// import StarBackground from '@/components/core/StarBackground'

export const metadata = {
	title: {
		template: `%s | ${siteTitle}`,
		default: siteTitle,
	},
	description: siteDescription,
	metadataBase: siteUrl,
	openGraph: {
		title: {
			template: `%s | ${siteTitle}`,
			default: siteTitle,
		},
		description: siteDescription,
		siteName: siteTitle,
		url: siteUrl,
		locale: 'en_US',
		type: 'website',
	},
}

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${GeistSans.className} bg-zinc-700 h-full p-0 m-0 overflow-x-hidden w-dvw`}>
			<head>{/* <meta name="apple-itunes-app" content="app-id=1726695035" /> */}</head>
			<body className="px-2 py-0 mx-auto my-0 text-black min-h-dvh w-dvw">
				{/* <StarBackground /> */}
				<div className="flex flex-col items-center w-full max-w-screen-xl mx-auto">
					<div className="flex flex-col w-full max-w-4xl p-4 m-4 bg-white rounded md:px-12 md:py-8 min-h-dvh ">
						<div className="flex flex-col items-center text-center">
							<h1 className="sr-only">{siteTitle}</h1>
							{/* IMAGE */}
							<RandomHeader />
							{/* NAV */}
							<nav className="flex flex-row flex-wrap justify-center w-full gap-4 p-2 my-4 border border-dashed border-zinc-300 border-x-0">
								<ActiveLink href="/blog" label="Blog" />
								<ActiveLink href="/" label="Links" />
								<ActiveLink href="/updates" label="Updates" fuzzy />
								<ActiveLink href="/episodes" label="Episodes" />
								<ActiveLink href="/listen-now" label="Listen Now" />
							</nav>
						</div>
						<main className="flex flex-col items-center flex-1 gap-4 text-center">{children}</main>
					</div>
				</div>
				{process.env.VERCEL_ENV && <Analytics />}
				{/* <SpeedInsights /> */}
			</body>
		</html>
	)
}
