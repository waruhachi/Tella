import '../styles/globals.css';

import { toast } from 'sonner';
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

const CHUNK_SIZE = 1024 * 1024 * 2;

export function App() {
	const [isUploading, setIsUploading] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [fileID, setFileID] = useState<string | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [dialogConfig, setDialogConfig] = useState<{
		title: string;
		description: string;
		fileName?: string;
		fileSize?: string;
		fileBlob?: Blob | null;
	}>({ title: '', description: '' });

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			event.target.value = '';
			setSelectedFile(file);
			setFileID(crypto.randomUUID());
			setIsUploading(false);
			setDialogConfig({
				title: '',
				description: '',
				fileName: '',
				fileSize: '',
				fileBlob: null,
			});
			setIsDialogOpen(false);
		}
	};

	const handleAPI = async (
		url: string,
		method: 'GET' | 'POST' | 'DELETE',
		body?: BodyInit | null,
		headers: HeadersInit = {}
	) => {
		const isFormData = body instanceof FormData;
		const finalHeaders = isFormData
			? headers
			: { 'Content-Type': 'application/json', ...headers };

		const response = await fetch(`/api${url}`, {
			method,
			body,
			headers: finalHeaders,
		});

		let data = null;
		if (response.ok) {
			if (
				response.headers
					.get('Content-Type')
					?.includes('application/json')
			) {
				data = response.json();
			} else {
				data = response.blob();
			}
		} else {
			throw new Error(data.error || 'Unknown error');
		}

		return data;
	};

	const handleFileUpload = async () => {
		if (!selectedFile || isUploading) return;

		setIsUploading(true);

		try {
			const checkResponse = await handleAPI(
				`/check/${selectedFile.name}`,
				'GET'
			);

			if (checkResponse.exists) {
				const blob = await handleAPI(
					`/download/${checkResponse.fileName}`,
					'GET'
				);

				setDialogConfig({
					title: 'File Found',
					description:
						'A patched version of this file already exists.',
					fileName: checkResponse.fileName,
					fileSize: checkResponse.fileSize,
					fileBlob: blob,
				});
				setIsDialogOpen(true);
				setIsUploading(false);
				return;
			}

			const currentFileID = fileID ?? crypto.randomUUID();
			setFileID(currentFileID);
			const totalChunks = Math.ceil(selectedFile.size / CHUNK_SIZE);

			let uploadResponse = null;
			for (let i = 1; i < totalChunks + 1; i++) {
				const chunk = selectedFile.slice(
					i * CHUNK_SIZE,
					(i + 1) * CHUNK_SIZE
				);

				const formData = new FormData();
				formData.append('file', chunk);
				formData.append('fileID', currentFileID);
				formData.append('totalChunks', totalChunks.toString());

				uploadResponse = await handleAPI(
					`/upload/${selectedFile.name}/${i.toString()}`,
					'POST',
					formData
				);
			}

			if (uploadResponse.finished) {
				const patchResponse = await handleAPI(
					`/patch/${selectedFile.name}`,
					'GET'
				);

				if (patchResponse.success) {
					const blob = await handleAPI(
						`/download/${patchResponse.fileName}`,
						'GET'
					);

					setDialogConfig({
						title: 'Patch Successful',
						description: 'Your file has been patched successfully.',
						fileName: patchResponse.fileName,
						fileSize: patchResponse.fileSize,
						fileBlob: blob,
					});
					setIsDialogOpen(true);
				} else {
					throw new Error('Patch failed');
				}
			} else {
				throw new Error('Upload failed');
			}
		} catch (error) {
			setDialogConfig({
				title: 'Error',
				description:
					error instanceof Error ? error.message : 'Upload failed',
			});
			setIsDialogOpen(true);
		} finally {
			setIsUploading(false);
			setSelectedFile(null);
			setFileID(null);
		}
	};

	const handleDownload = async () => {
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

			toast.info('IPA Downloading', {
				description: 'IPA will be deleted in 2 minutes',
			});
		}
	};

	const handleCancle = async () => {
		if (dialogConfig.fileBlob && dialogConfig.fileName) {
			setSelectedFile(null);
			setIsDialogOpen(false);

			toast.info('IPA Download Canceled', {
				description: 'IPA will be deleted in 1 Hour',
			});
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
						<AlertDialogCancel onClick={handleCancle}>
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

export default App;
