import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { NextResponse, type NextRequest } from 'next/server';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
	let filePath = '';
	let patchedFilePath = '';

	try {
		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file) {
			return NextResponse.json(
				{ error: 'No file uploaded' },
				{ status: 400 }
			);
		}

		// Setup paths
		const patchDir = path.join(process.cwd(), 'public', 'ipas', 'patched');
		const uploadDir = path.join(
			process.cwd(),
			'public',
			'ipas',
			'uploaded'
		);
		filePath = path.join(uploadDir, file.name);
		const baseName = path.parse(file.name).name;
		patchedFilePath = path.join(patchDir, `${baseName}_Patched.ipa`);

		// Ensure directories exist
		[uploadDir, patchDir].forEach((dir) => {
			if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
		});

		// Write uploaded file
		fs.writeFileSync(filePath, Buffer.from(await file.arrayBuffer()));

		// Execute patching script
		const scriptPath = path.join(
			process.cwd(),
			'src',
			'vender',
			'SatellaJailed',
			'patch-linux.sh'
		);

		const { stderr } = await execAsync(
			`${scriptPath} -i "${filePath}" -n "${patchDir}"`
		);

		if (stderr) console.error(stderr);

		// Verify output
		if (!fs.existsSync(patchedFilePath)) {
			console.error('Upload error: Patched file not generated');
			return NextResponse.json(
				{
					error: 'Patched file not generated',
				},
				{ status: 500 }
			);
		}

		// Read and return file
		const fileBuffer = fs.readFileSync(patchedFilePath);
		const fileName = path.basename(patchedFilePath);

		// Create a Blob for proper file handling
		const blob = new Blob([fileBuffer], {
			type: 'application/octet-stream',
		});

		return new NextResponse(blob, {
			headers: {
				'Content-Disposition': `attachment; filename="${fileName}"`,
				'Content-Type': 'application/octet-stream',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type',
			},
			status: 200,
		});
	} catch (error) {
		console.error('Upload error:', error);
		return NextResponse.json(
			{
				error: 'Upload failed',
				details:
					error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	} finally {
		// Cleanup all files regardless of outcome
		[filePath, patchedFilePath].forEach((path) => {
			try {
				if (path && fs.existsSync(path)) {
					fs.unlinkSync(path);
				}
			} catch (cleanupError) {
				console.error(`Error cleaning up ${path}:`, cleanupError);
			}
		});
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
};
