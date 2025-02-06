import path from 'path';
import fs from 'fs/promises';
import { NextResponse, type NextRequest } from 'next/server';

const CHUNKS_DIR = path.join(process.cwd(), 'public', 'chunks');

export async function POST(request: NextRequest) {
	try {
		const contentType = request.headers.get('content-type') || '';
		if (!contentType.includes('multipart/form-data')) {
			return NextResponse.json(
				{ error: 'Invalid Content-Type' },
				{ status: 400 }
			);
		}

		const formData = await request.formData();
		const file = formData.get('file') as Blob | null;
		const fileID = formData.get('fileID') as string | null;
		const chunkIndex = formData.get('chunkIndex') as string | null;
		const totalChunks = formData.get('totalChunks') as string | null;

		if (!file || !fileID || chunkIndex === null || !totalChunks) {
			return NextResponse.json(
				{ error: 'Missing parameters' },
				{ status: 400 }
			);
		}

		const chunkIndexNum = parseInt(chunkIndex, 10);

		const fileDir = path.join(CHUNKS_DIR, fileID);
		await fs.mkdir(fileDir, { recursive: true });

		const chunkPath = path.join(fileDir, `${chunkIndexNum}.part`);
		await fs.writeFile(chunkPath, Buffer.from(await file.arrayBuffer()));

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
