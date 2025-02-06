import path from 'path';
import fs from 'fs/promises';
import { NextResponse, type NextRequest } from 'next/server';

const CHUNKS_DIR = path.join(process.cwd(), 'public', 'chunks');

export async function POST(request: NextRequest) {
	try {
		const contentType = request.headers.get('content-type') || '';
		if (!contentType.includes('application/json')) {
			return NextResponse.json(
				{ error: 'Invalid Content-Type' },
				{ status: 400 }
			);
		}

		const { fileID, chunkIndex, totalChunks, chunkData } =
			await request.json();

		if (!fileID || chunkIndex === undefined || !totalChunks || !chunkData) {
			return NextResponse.json(
				{ error: 'Missing parameters' },
				{ status: 400 }
			);
		}

		const fileDir = path.join(CHUNKS_DIR, fileID);
		await fs.mkdir(fileDir, { recursive: true });

		const chunkPath = path.join(fileDir, `${chunkIndex}.part`);
		await fs.writeFile(chunkPath, Buffer.from(chunkData, 'base64'));

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error('Chunk error:', error);
		return NextResponse.json(
			{
				error: 'Chunk failed',
				details:
					error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
