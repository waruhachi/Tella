import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: '1GB',
			allowedOrigins: [
				'localhost:3000',
				'*.app.github.dev',
				'*.waru.moe',
			],
		},
	},
};

export default nextConfig;
