'use client'

import React, { useEffect, useRef, useState } from 'react'

type LazyYoutubeProps = {
	videoId: string
}

const LazyYoutube = ({ videoId }: LazyYoutubeProps) => {
	const [load, setLoad] = useState(false)
	const videoRef = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				setLoad(true)
				observer.disconnect()
			}
		})

		// @ts-ignore
		observer.observe(videoRef.current)

		return () => {
			if (videoRef.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				observer.unobserve(videoRef.current)
			}
		}
	}, [])

	return (
		<div ref={videoRef} className="mx-4 my-6 overflow-hidden border rounded-lg border-zinc-900 bg-zinc-950/75 hover:border-zinc-500">
			{load ? (
				<iframe
					width="100%"
					height="400"
					src={`https://www.youtube.com/embed/${videoId}`}
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
				></iframe>
			) : (
				<div>Loading...</div>
			)}
		</div>
	)
}

export default LazyYoutube
