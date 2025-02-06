import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'export',
	basePath: '/Tella',
	experimental: {
		serverActions: {
			bodySizeLimit: '1GB',
			allowedOrigins: ['localhost:3000', '*.app.github.dev'],
		},
	},
};

export default nextConfig;
