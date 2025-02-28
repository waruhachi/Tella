import path from 'path';
import fs from 'fs/promises';
import { promisify } from 'util';
import { exec } from 'child_process';
import { createReadStream, createWriteStream } from 'fs';

import { Hono } from 'hono';
import { validator } from 'hono/validator';

const app = new Hono();

const TEMP_DIR = path.join(__dirname, 'temp');
const CHUNKS_DIR = path.join(TEMP_DIR, 'chunks');
const VENDOR_DIR = path.join(__dirname, 'vendor');

const PATCH_DIR = path.join(TEMP_DIR, 'patched');
const UPLOAD_DIR = path.join(TEMP_DIR, 'uploaded');

const execAsync = promisify(exec);

/* Base route */
app.get('/', (context) => {
	return context.body('API is running!');
});

/* Check route */
app.get(
	'/check/:fileName',
	validator('param', (value, context) => {
		const fileName = decodeURIComponent(value['fileName']);

		if (!fileName || typeof fileName !== 'string') {
			return context.text('Invalid!', 400);
		}

		return { fileName };
	}),
	async (context) => {
		try {
			const { fileName } = context.req.valid('param');
			const uploadedFile = path.join(UPLOAD_DIR, fileName);
			const patchedFile = path.join(
				PATCH_DIR,
				fileName.replace('.ipa', '_Patched.ipa')
			);

			const fileExists = async (filePath: string) => {
				try {
					await fs.access(filePath);
					return true;
				} catch {
					return false;
				}
			};

			const patchedExists = await fileExists(patchedFile);
			const uploadedExists = await fileExists(uploadedFile);

			const fileFound = patchedExists || uploadedExists;
			const filePath = patchedExists
				? patchedFile
				: uploadedExists
				? uploadedFile
				: '';

			return context.json({
				exists: fileFound,
				filePath: fileFound ? filePath : null,
			});
		} catch (error) {
			console.error('Check file error:', error);
			return context.json(
				{
					error: 'Check failed',
					details:
						error instanceof Error
							? error.message
							: 'Unknown error',
				},
				500
			);
		}
	}
);

/* Chunk route */
app.post(
	'/chunk',
	validator('form', (value, context) => {
		const file = value['file'];
		const fileID = value['fileID'];
		const chunkIndex = Number(value['chunkIndex']);

		if (
			!(file instanceof File) ||
			!fileID ||
			typeof fileID !== 'string' ||
			isNaN(chunkIndex) ||
			chunkIndex < 0
		) {
			return context.text('Invalid!', 400);
		}

		return { file, fileID, chunkIndex };
	}),
	async (context) => {
		try {
			const contentType = context.req.header('Content-Type') || '';
			if (!contentType.includes('multipart/form-data')) {
				return context.json({ error: 'Invalid Content-Type' }, 400);
			}

			const { file, fileID, chunkIndex } = context.req.valid('form');

			const fileDir = path.join(CHUNKS_DIR, fileID);
			try {
				await fs.access(fileDir);
			} catch {
				await fs.mkdir(fileDir, { recursive: true });
			}

			const chunkPath = path.join(fileDir, `${chunkIndex}.part`);

			const stream = createWriteStream(chunkPath);
			stream.write(Buffer.from(await file.arrayBuffer()));
			stream.end();

			return context.json({ success: true });
		} catch (error) {
			console.error('Chunk error:', error);
			return context.json(
				{
					error: 'Chunk failed',
					details:
						error instanceof Error
							? error.message
							: 'Unknown error',
				},
				500
			);
		}
	}
);

/* Merge Route */
app.post(
	'/merge',
	validator('json', (value, context) => {
		const fileID = value['fileID'];
		const fileName = value['fileName'];

		if (
			!fileID ||
			typeof fileID !== 'string' ||
			!fileName ||
			typeof fileName !== 'string'
		) {
			return context.text('Invalid!', 400);
		}
		return { fileID, fileName };
	}),
	async (context) => {
		try {
			const { fileID, fileName } = context.req.valid('json');
			const fileDir = path.join(CHUNKS_DIR, fileID);
			const filePath = path.join(UPLOAD_DIR, fileName);

			await fs.mkdir(UPLOAD_DIR, { recursive: true });

			try {
				await fs.access(fileDir);
			} catch {
				return context.json({ error: 'Chunks not found' }, 400);
			}

			const chunkFiles = (await fs.readdir(fileDir)).sort(
				(a, b) => parseInt(a) - parseInt(b)
			);

			const writeStream = createWriteStream(filePath);

			for (const chunk of chunkFiles) {
				const chunkPath = path.join(fileDir, chunk);
				const readStream = createReadStream(chunkPath);
				await new Promise<void>((resolve, reject) => {
					readStream.pipe(writeStream, { end: false });
					readStream.on('end', async () => {
						await fs.unlink(chunkPath);
						resolve();
					});
					readStream.on('error', reject);
				});
			}

			await new Promise<void>((resolve, reject) => {
				writeStream.end();
				writeStream.on('finish', resolve);
				writeStream.on('error', reject);
			});

			await fs.rmdir(fileDir);

			return context.json({ success: true, filePath });
		} catch (error) {
			console.error('Merge error:', error);
			return context.json(
				{
					error: 'Merge failed',
					details:
						error instanceof Error
							? error.message
							: 'Unknown error',
				},
				500
			);
		}
	}
);

/* Patch Route */
app.post(
	'/patch',
	validator('json', (value, context) => {
		const filePath = value['filePath'];

		if (!filePath || typeof filePath !== 'string') {
			return context.text('Invalid!', 400);
		}
		return { filePath };
	}),
	async (context) => {
		let uploadFilePath = '';
		let patchFilePath = '';

		try {
			const { filePath } = context.req.valid('json');
			const baseName = path.parse(filePath).name;

			uploadFilePath = path.join(UPLOAD_DIR, filePath);
			patchFilePath = path.join(PATCH_DIR, `${baseName}_Patched.ipa`);

			await fs.mkdir(PATCH_DIR, { recursive: true });

			try {
				await fs.access(uploadFilePath);
			} catch {
				return context.json({ error: 'File not found' }, 404);
			}

			const scriptPath = path.join(
				VENDOR_DIR,
				'SatellaJailed',
				'patch-linux.sh'
			);

			const { spawn } = require('child_process');
			const patchProcess = spawn(scriptPath, [
				'-i',
				uploadFilePath,
				'-n',
				PATCH_DIR,
			]);

			let stdout = '';
			let stderr = '';

			patchProcess.stdout.on(
				'data',
				(data: Buffer) => (stdout += data.toString())
			);
			patchProcess.stderr.on(
				'data',
				(data: Buffer) => (stderr += data.toString())
			);

			await new Promise<void>((resolve, reject) => {
				patchProcess.on('close', (code: Number) => {
					if (code !== 0)
						reject(new Error(`Patch script failed: ${stderr}`));
					else resolve();
				});
			});

			if (stderr) console.error(stderr);
			if (stdout) console.log(stdout);

			try {
				await fs.access(patchFilePath);
			} catch {
				return context.json(
					{ error: 'Patched file not generated' },
					500
				);
			}

			const publicFilePath = `/ipas/patched/${baseName}_Patched.ipa`;
			const patchedFileName = `${baseName}_Patched.ipa`;

			return context.json({
				success: true,
				filePath: publicFilePath,
				fileName: patchedFileName,
			});
		} catch (error) {
			console.error('Patch error:', error);
			return context.json(
				{
					error: 'Patch failed',
					details:
						error instanceof Error
							? error.message
							: 'Unknown error',
				},
				500
			);
		}
	}
);

/* Clean route */
app.post(
	'/clean',
	validator('json', (value, context) => {
		const fileName = value['fileName'];

		if (!fileName || typeof fileName !== 'string') {
			return context.text('Invalid!', 400);
		}
		return { fileName };
	}),
	async (context) => {
		try {
			const { fileName } = context.req.valid('json');

			const isPatched = fileName.includes('_Patched.ipa');
			const uploadedFileName = isPatched
				? fileName.replace('_Patched.ipa', '.ipa')
				: fileName;
			const patchedFileName = isPatched
				? fileName
				: fileName.replace('.ipa', '_Patched.ipa');

			const uploadedPath = path.join(UPLOAD_DIR, uploadedFileName);
			const patchedPath = path.join(PATCH_DIR, patchedFileName);

			await fs.unlink(uploadedPath).catch((err) => {
				if (err.code !== 'ENOENT')
					console.warn(`Failed to delete ${uploadedPath}:`, err);
			});
			await fs.unlink(patchedPath).catch((err) => {
				if (err.code !== 'ENOENT')
					console.warn(`Failed to delete ${patchedPath}:`, err);
			});

			return context.json({ success: true, message: 'File cleaned up' });
		} catch (error) {
			console.error('Clean error:', error);
			return context.json(
				{
					error: 'Clean failed',
					details:
						error instanceof Error
							? error.message
							: 'Unknown error',
				},
				500
			);
		}
	}
);

export default app;
