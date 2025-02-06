import path from 'path';
import fs from 'fs/promises';
import { createWriteStream } from 'fs';
import { NextResponse, type NextRequest } from 'next/server';

const CHUNKS_DIR = path.join(process.cwd(), 'public', 'chunks');
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'ipas', 'uploaded');

export async function POST(request: NextRequest) {
	try {
		const { fileID, fileName } = await request.json();
		const fileDir = path.join(CHUNKS_DIR, fileID);
		const finalFilePath = path.join(UPLOAD_DIR, fileName);
		const publicFilePath = `/ipas/uploaded/${fileName}`; // Public URL

		await fs.mkdir(UPLOAD_DIR, { recursive: true });

		if (!(await fs.stat(fileDir).catch(() => false))) {
			return NextResponse.json(
				{ error: 'Chunks not found' },
				{ status: 400 }
			);
		}

		const chunkFiles = (await fs.readdir(fileDir)).sort(
			(a, b) => parseInt(a) - parseInt(b)
		);
		const writeStream = createWriteStream(finalFilePath);

		for (const chunk of chunkFiles) {
			const chunkPath = path.join(fileDir, chunk);
			const data = await fs.readFile(chunkPath);
			writeStream.write(data);
			await fs.unlink(chunkPath);
		}

		writeStream.end();
		await fs.rmdir(fileDir);

		return NextResponse.json(
			{ success: true, filePath: publicFilePath },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Merge error:', error);
		return NextResponse.json(
			{
				error: 'Merge failed',
				details:
					error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
