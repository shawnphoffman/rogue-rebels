module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'd3t3ozftmdmh3i.cloudfront.net',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'theroguerebels.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
			},
			{
				protocol: 'https',
				hostname: 'storage.googleapis.com',
				port: '',
				pathname: '/goodpods-images-bucket/**',
			},
		],
	},
	async redirects() {
		return [
			{
				source: '/studio',
				destination: 'https://pod-content-studio.vercel.app/studio',
				permanent: false,
			},
			{
				source: '/refresh',
				destination: '/api/revalidate/episodes',
				permanent: true,
			},
		]
	},
	// This is sanity-related
	// logging: {
	// 	fetches: {
	// 		fullUrl: true,
	// 	},
	// },
}
