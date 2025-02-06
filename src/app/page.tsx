'use client';

import { useState } from 'react';
import { Upload, Download } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from '@/components/ui/alert-dialog';

const CHUNK_SIZE = 1024 * 1024 * 4;

export default function FileUploader() {
	const [fileID, setFileID] = useState<string | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [dialogConfig, setDialogConfig] = useState<{
		title: string;
		description: string;
		fileName?: string;
		fileSize?: string;
		fileBlob?: Blob | null;
	}>({ title: '', description: '' });
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			setFileID(crypto.randomUUID());
		}
	};

	const handleApiCall = async (
		url: string,
		method: string,
		body?: BodyInit | null,
		headers: HeadersInit = { 'Content-Type': 'application/json' }
	) => {
		const response = await fetch(url, { method, body, headers });
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.details || data.error || 'Unknown error');
		}

		return data;
	};

	const handleFileUpload = async () => {
		if (!selectedFile || !fileID || isUploading) return;

		setIsUploading(true);
		const totalChunks = Math.ceil(selectedFile.size / CHUNK_SIZE);

		try {
			for (let i = 0; i < totalChunks; i++) {
				const chunk = selectedFile.slice(
					i * CHUNK_SIZE,
					(i + 1) * CHUNK_SIZE
				);
				const chunkBuffer = await chunk.arrayBuffer();
				const chunkBase64 = Buffer.from(chunkBuffer).toString('base64');

				await handleApiCall(
					'/chunk',
					'POST',
					JSON.stringify({
						fileID,
						chunkIndex: i,
						totalChunks,
						chunkData: chunkBase64,
					})
				);
			}

			const mergeResponse = await handleApiCall(
				'/merge',
				'POST',
				JSON.stringify({ fileID, fileName: selectedFile.name })
			);

			if (!mergeResponse.filePath) {
				throw new Error('Merge response did not include file path');
			}

			const patchResponse = await handleApiCall(
				'/patch',
				'POST',
				JSON.stringify({ filePath: mergeResponse.filePath })
			);

			const blob = await fetch(patchResponse.filePath).then((res) =>
				res.blob()
			);
			const fileName = patchResponse.fileName || 'patched.ipa';

			setDialogConfig({
				title: 'Patch Successful',
				description: 'Your file has been patched successfully.',
				fileName,
				fileSize: `${(blob.size / 1024 / 1024).toFixed(2)} MB`,
				fileBlob: blob,
			});
			setIsDialogOpen(true);
		} catch (error) {
			setDialogConfig({
				title: 'Error',
				description:
					error instanceof Error ? error.message : 'Upload failed',
			});
			setIsDialogOpen(true);
		} finally {
			setIsUploading(false);
		}
	};

	const handleDownload = () => {
		if (dialogConfig.fileBlob && dialogConfig.fileName) {
			const url = URL.createObjectURL(dialogConfig.fileBlob);

			const a = document.createElement('a');
			a.href = url;
			a.download = dialogConfig.fileName;

			document.body.appendChild(a);
			a.click();

			URL.revokeObjectURL(url);
			document.body.removeChild(a);

			setSelectedFile(null);
			setIsDialogOpen(false);
		}
	};

	return (
		<>
			<div className='flex items-center justify-center min-h-screen'>
				<div className='w-[400px] mx-auto p-10 bg-white shadow-2xl rounded-2xl'>
					<div className='flex flex-col items-center space-y-8'>
						<div className='w-full'>
							<Input
								type='file'
								onChange={handleFileChange}
								className='hidden'
								id='file-upload'
								accept='.ipa'
							/>
							<label
								htmlFor='file-upload'
								className='flex items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-500 transition text-xl'
							>
								<Upload className='mr-4 h-8 w-8' />
								<span>
									{selectedFile
										? selectedFile.name
										: 'Choose a file'}
								</span>
							</label>
						</div>

						<Button
							onClick={handleFileUpload}
							disabled={!selectedFile || isUploading}
							className='w-full text-xl py-4'
						>
							{isUploading ? (
								<div className='flex items-center justify-center'>
									<div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white'></div>
									<span className='ml-2'>Uploading...</span>
								</div>
							) : (
								'Upload File'
							)}
						</Button>
					</div>
				</div>
			</div>

			{/* Custom Alert Dialog */}
			<AlertDialog
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{dialogConfig.title}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{dialogConfig.description}
							{dialogConfig.fileName && (
								<>
									<span className='mt-4 block'>
										<strong>File Name:</strong>{' '}
										{dialogConfig.fileName}
									</span>
									<span className='block'>
										<strong>File Size:</strong>{' '}
										{dialogConfig.fileSize}
									</span>
								</>
							)}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel
							onClick={() => {
								setSelectedFile(null);
								setIsDialogOpen(false);
							}}
						>
							Cancel
						</AlertDialogCancel>
						{dialogConfig.fileBlob && (
							<AlertDialogAction onClick={handleDownload}>
								<Download className='mr-2 h-4 w-4' />
								Download
							</AlertDialogAction>
						)}
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
