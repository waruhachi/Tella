import path from 'path';
import { tmpdir } from 'os';
import fs from 'node:fs/promises';
import { createWriteStream } from 'fs';

import { serve, S3Client } from 'bun';
import index from './index.html';

const TEMP_DIR = path.join(tmpdir(), 'tella');
const CHUNKS_DIR = path.join(TEMP_DIR, 'chunks');
// const VENDOR_DIR = path.join(__dirname, 'vendor');

const PATCH_DIR = path.join(TEMP_DIR, 'patched');
const UPLOAD_DIR = path.join(TEMP_DIR, 'uploaded');

const r2 = new S3Client({
	accessKeyId: process.env.R2_ACCESS_KEY_ID,
	secretAccessKey: process.env.R2_SECRETE_ACCESS_KEY,
	bucket: process.env.R2_BUCKET,
	endpoint: process.env.R2_ENDPOINT,
});

const server = serve({
	routes: {
		'/*': index,
		'/api/status': {
			async GET(request) {
				return Response.json({
					status: 'OK',
					uptime: process.uptime(),
				});
			},
		},
		'/api/check/:fileName': {
			async GET(request) {
				const fileName = request.params.fileName.replace(
					'.ipa',
					'_Patched.ipa'
				);
				const filePath = `patched/${fileName}`;
				const s3File = r2.file(filePath);
				const s3FileSize = formatFileSize(await r2.size(filePath));
				const exists = await s3File.exists();

				if (exists) {
					return Response.json({
						exists: exists,
						fileName: fileName,
						fileSize: s3FileSize,
					});
				} else {
					return Response.json({
						exists: false,
					});
				}
				// try {
				// 	const fileName = request.params.fileName;
				// 	const patchedFilePath = path.join(
				// 		PATCH_DIR,
				// 		fileName.replace('.ipa', '_Patched.ipa')
				// 	);
				// 	const patchedFile = Bun.file(patchedFilePath);
				// 	const pathcedFileExists = await patchedFile.exists();
				// 	const PatchedFileSize = formatFileSize(patchedFile.size);

				// 	if (
				// 		patchedFile &&
				// 		pathcedFileExists &&
				// 		patchedFile.size > 0
				// 	) {
				// 		return Response.json({
				// 			exists: pathcedFileExists,
				// 			fileName: fileName.replace('.ipa', '_Patched.ipa'),
				// 			fileSize: PatchedFileSize,
				// 		});
				// 	} else {
				// 		return Response.json({
				// 			exists: false,
				// 		});
				// 	}
				// } catch (error) {
				// 	return Response.json(
				// 		{
				// 			error: 'Check failed',
				// 			details:
				// 				error instanceof Error
				// 					? error.message
				// 					: 'Unknown error',
				// 		},
				// 		{
				// 			status: 500,
				// 		}
				// 	);
				// }
			},
		},
		'/api/upload/:fileName/:chunkIndex': {
			async POST(request) {
				try {
					const contentType =
						request.headers.get('Content-Type') || '';
					if (!contentType.includes('multipart/form-data')) {
						return Response.json(
							{ error: 'Invalid Content-Type' },
							{
								status: 400,
							}
						);
					}

					const fileName = request.params.fileName as string;
					const chunkIndex = parseInt(
						request.params.chunkIndex as string,
						10
					);

					const formData = await request.formData();
					const file = formData.get('file') as File;
					const fileID = formData.get('fileID') as string;
					const totalChunks = parseInt(
						formData.get('totalChunks') as string,
						10
					);

					if (
						!file ||
						!fileID ||
						!fileName ||
						(!chunkIndex && isNaN(chunkIndex) && chunkIndex < 0)
					) {
						return Response.json(
							{ error: 'Invalid form data' },
							{
								status: 400,
							}
						);
					}

					const fileDir = path.join(CHUNKS_DIR, fileID);
					try {
						await fs.access(fileDir);
					} catch {
						await fs.mkdir(fileDir, { recursive: true });
					}

					const chunkPath = path.join(fileDir, `${chunkIndex}.part`);
					await fs.writeFile(
						chunkPath,
						Buffer.from(await file.arrayBuffer())
					);

					try {
						await fs.access(UPLOAD_DIR);
					} catch {
						await fs.mkdir(UPLOAD_DIR, { recursive: true });
					}
					const filePath = path.join(UPLOAD_DIR, fileName);

					try {
						await fs.access(fileDir);
					} catch {
						return Response.json(
							{ error: 'Chunks not found' },
							{
								status: 404,
							}
						);
					}

					const chunkFiles = (await fs.readdir(fileDir)).sort(
						(a, b) => parseInt(a) - parseInt(b)
					);

					let finished = false;
					if (chunkFiles.length === totalChunks) {
						const writeStream = createWriteStream(filePath);

						for (const chunk of chunkFiles) {
							const chunkPath = path.join(fileDir, chunk);
							const data = await fs.readFile(chunkPath);
							writeStream.write(data);
							await fs.unlink(chunkPath);
						}

						writeStream.end();
						await fs.rmdir(fileDir);

						finished = true;
					}

					return Response.json({ finished });
				} catch (error) {
					return Response.json(
						{
							error: 'Upload failed',
							details:
								error instanceof Error
									? error.message
									: 'Unknown error',
						},
						{
							status: 500,
						}
					);
				}
			},
		},
		'/api/download/:fileName': {
			async GET(request) {
				const fileName = request.params.fileName;
				const filePath = `patched/${fileName}`;

				const downloadUrl = r2.presign(filePath, {
					expiresIn: 3600,
				});

				console.log(`Download URL: ${downloadUrl}`);

				return new Response(downloadUrl);
			},
		},
		'/api/patch/:fileName': {
			async GET(request) {
				const fileName = request.params.fileName;
				const patchedFileName = fileName.replace(
					'.ipa',
					'_Patched.ipa'
				);

				try {
					await fs.access(PATCH_DIR);
				} catch {
					await fs.mkdir(PATCH_DIR, { recursive: true });
				}

				const originalFilePath = path.join(UPLOAD_DIR, fileName);
				const patchedFilePath = path.join(PATCH_DIR, patchedFileName);

				try {
					// placeholder to do the patching
					await fs.rename(originalFilePath, patchedFilePath);
				} catch (error) {
					return Response.json(
						{
							success: false,
							error: `Failed to patch file`,
						},
						{ status: 500 }
					);
				}

				const patchedFile = Bun.file(patchedFilePath);
				const pathcedFileExists = await patchedFile.exists();
				const PatchedFileSize = formatFileSize(patchedFile.size);

				if (patchedFile && pathcedFileExists && patchedFile.size > 0) {
					return Response.json({
						success: pathcedFileExists,
						fileName: patchedFileName,
						fileSize: PatchedFileSize,
					});
				} else {
					return Response.json({
						exists: false,
					});
				}
			},
		},
		// '/api/clean/:fileName': {
		// 	async DELETE(request) {
		// 		const fileName = request.params.fileName;

		// 		const uploadedFileName = fileName.includes('_Patched.ipa')
		// 			? fileName.replace('_Patched.ipa', '.ipa')
		// 			: fileName;
		// 		const patchedFileName = fileName.includes('_Patched.ipa')
		// 			? fileName
		// 			: fileName.replace('.ipa', '_Patched.ipa');

		// 		const uploadedPath = path.join(UPLOAD_DIR, uploadedFileName);
		// 		const patchedPath = path.join(PATCH_DIR, patchedFileName);

		// 		const uploadedFile = Bun.file(uploadedPath);
		// 		const uploadedFileExists = await uploadedFile.exists();
		// 		const patchedFile = Bun.file(patchedPath);
		// 		const patchedFileExists = await patchedFile.exists();

		// 		try {
		// 			if (uploadedFileExists) await uploadedFile.delete();
		// 			if (patchedFileExists) await patchedFile.delete();
		// 		} catch {
		// 			console.warn(
		// 				'File not found, skipping cleanup:',
		// 				patchedPath
		// 			);
		// 		}

		// 		return Response.json({ success: true });
		// 	},
		// },
	},

	development: process.env.NODE_ENV !== 'production',
});

console.log(`🚀 Server running at ${server.url}`);

function formatFileSize(bytes: number) {
	if (bytes === 0) return '0 B';

	const units = ['B', 'KB', 'MB', 'GB', 'TB'];
	const decimals = 2;
	let unitIndex = 0;

	while (bytes >= 1024 && unitIndex < units.length - 1) {
		bytes /= 1024;
		unitIndex++;
	}

	return `${bytes.toFixed(unitIndex === 0 ? 0 : decimals)} ${
		units[unitIndex]
	}`;
}
