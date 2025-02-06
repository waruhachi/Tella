import fs from 'fs/promises';
import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import { NextResponse, type NextRequest } from 'next/server';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
	let filePath = '';
	let patchedFilePath = '';

	try {
		const body = await request.json();

		if (!body.filePath) {
			return NextResponse.json(
				{ error: 'No file path provided' },
				{ status: 400 }
			);
		}

		filePath = path.join(process.cwd(), 'public', body.filePath);
		const patchDir = path.join(process.cwd(), 'public', 'ipas', 'patched');
		const baseName = path.parse(filePath).name;
		patchedFilePath = path.join(patchDir, `${baseName}_Patched.ipa`);

		await fs.mkdir(patchDir, { recursive: true });

		try {
			await fs.access(filePath);
		} catch {
			return NextResponse.json(
				{ error: 'File not found' },
				{ status: 404 }
			);
		}

		const scriptPath = path.join(
			process.cwd(),
			'src',
			'vendor',
			'SatellaJailed',
			'patch-linux.sh'
		);

		const { stderr } = await execAsync(
			`${scriptPath} -i "${filePath}" -n "${patchDir}"`
		);

		if (stderr) console.error(stderr);

		try {
			await fs.access(patchedFilePath);
		} catch {
			return NextResponse.json(
				{ error: 'Patched file not generated' },
				{ status: 500 }
			);
		}

		const publicFilePath = `/ipas/patched/${baseName}_Patched.ipa`;
		const patchedFileName = `${baseName}_Patched.ipa`;

		return NextResponse.json(
			{
				success: true,
				filePath: publicFilePath,
				fileName: patchedFileName,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Patch error:', error);
		return NextResponse.json(
			{
				error: 'Patch failed',
				details:
					error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}

export const config = {
	api: {
		bodyParser: true,
	},
};
