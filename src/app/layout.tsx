import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Tella',
	description:
		'A web service that automatically injects Satella into uploaded IPA files',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
