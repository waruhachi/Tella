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

export default function FileUploader() {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [dialogConfig, setDialogConfig] = useState({
		title: '',
		description: '',
		fileName: '',
		fileSize: '',
		fileBlob: null as Blob | null,
	});

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(file);
		}
	};

	const handleFileUpload = async () => {
		if (!selectedFile || isUploading) return; // Prevent multiple clicks

		setIsUploading(true); // Start loading

		const formData = new FormData();
		formData.append('file', selectedFile);

		try {
			const response = await fetch('/upload', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				// Get the blob from response
				const blob = await response.blob();

				// Get filename from Content-Disposition header
				const contentDisposition = response.headers.get(
					'Content-Disposition'
				);
				const fileNameMatch =
					contentDisposition?.match(/filename="?(.+)"?/);
				const fileName = fileNameMatch
					? fileNameMatch[1]
					: 'patched.ipa';

				// Show success dialog with file details
				setDialogConfig({
					title: 'Patch Successful',
					description: 'Your file has been patched successfully.',
					fileName,
					fileSize: `${(blob.size / 1024 / 1024).toFixed(2)} MB`,
					fileBlob: blob,
				});
				setIsDialogOpen(true);
			} else {
				const errorData = await response.json();
				setDialogConfig({
					title: 'Error',
					description: `Upload failed: ${errorData.error}`,
					fileName: '',
					fileSize: '',
					fileBlob: null,
				});
				setIsDialogOpen(true);
			}
		} catch (error) {
			console.error('Upload error:', error);
			setDialogConfig({
				title: 'Error',
				description: 'Upload failed',
				fileName: '',
				fileSize: '',
				fileBlob: null,
			});
			setIsDialogOpen(true);
		} finally {
			setIsUploading(false); // Stop loading
		}
	};

	const handleDownload = () => {
		if (dialogConfig.fileBlob) {
			// Create a URL for the blob
			const url = window.URL.createObjectURL(dialogConfig.fileBlob);

			// Create a temporary anchor element
			const a = document.createElement('a');
			a.href = url;
			a.download = dialogConfig.fileName;

			// Trigger the download
			document.body.appendChild(a);
			a.click();

			// Cleanup
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);

			// Reset state
			setSelectedFile(null);
			setIsDialogOpen(false);
		}
	};

	const clearFile = () => {
		setSelectedFile(null);
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
							disabled={!selectedFile || isUploading} // Disable during upload
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
							Discard
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
