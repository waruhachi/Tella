import path from 'path';
import fs from 'fs/promises';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		if (!body.fileName) {
			return NextResponse.json(
				{ error: 'No file name provided' },
				{ status: 400 }
			);
		}

		const uploadedFileName = body.fileName.includes('_Patched.ipa')
			? body.fileName.replace('_Patched.ipa', '.ipa')
			: body.fileName;
		const patchedFileName = body.fileName.includes('_Patched.ipa')
			? body.fileName
			: body.fileName.replace('.ipa', '_Patched.ipa');

		const uploadedPath = path.join(
			process.cwd(),
			'public',
			'ipas',
			'uploaded',
			uploadedFileName
		);

		const patchedPath = path.join(
			process.cwd(),
			'public',
			'ipas',
			'patched',
			patchedFileName
		);

		try {
			await fs.access(uploadedPath);
			await fs.unlink(uploadedPath);

			await fs.access(patchedPath);
			await fs.unlink(patchedPath);
		} catch {
			console.warn('File not found, skipping cleanup:', patchedPath);
		}

		return NextResponse.json(
			{ success: true, message: 'File cleaned up' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Cleanup error:', error);
		return NextResponse.json(
			{
				error: 'Cleanup failed',
				details:
					error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
