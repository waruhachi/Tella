import path from 'path';
import fs from 'fs/promises';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const fileName = body.fileName.replace('.ipa', '_Patched.ipa');

		if (!fileName) {
			return NextResponse.json(
				{ error: 'No file name provided' },
				{ status: 400 }
			);
		}

		const patchedFilePath = path.join(
			process.cwd(),
			'public',
			'ipas',
			'patched',
			fileName
		);
		console.log('Checking if file exists:', patchedFilePath);

		try {
			await fs.access(patchedFilePath);
			return NextResponse.json(
				{ exists: true, filePath: `/ipas/patched/${fileName}` },
				{ status: 200 }
			);
		} catch {
			return NextResponse.json({ exists: false }, { status: 200 });
		}
	} catch (error) {
		console.error('Check file error:', error);
		return NextResponse.json(
			{ error: 'Failed to check file' },
			{ status: 500 }
		);
	}
}
