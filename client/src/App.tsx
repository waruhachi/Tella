import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';

function App() {
	const [file, setFile] = useState<File | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [uploadStatus, setUploadStatus] = useState<
		'idle' | 'success' | 'error'
	>('idle');
	const [errorMessage, setErrorMessage] = useState('');
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		setIsDragging(false);
	};

	const validateFile = (file: File): boolean => {
		if (!file.name.toLowerCase().endsWith('.ipa')) {
			setErrorMessage('Only .IPA files are allowed');
			return false;
		}
		return true;
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);

		const droppedFile = e.dataTransfer.files[0];
		if (droppedFile && validateFile(droppedFile)) {
			setFile(droppedFile);
			setUploadStatus('idle');
			setErrorMessage('');
		}
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile && validateFile(selectedFile)) {
			setFile(selectedFile);
			setUploadStatus('idle');
			setErrorMessage('');
		}
	};

	const handleUpload = async () => {
		if (!file) return;

		try {
			const response = await fetch(
				`/api/check/${encodeURIComponent(file.name)}`
			);

			if (!response.ok) {
				throw new Error('Upload failed');
			}

			setUploadStatus('success');
			setErrorMessage('');
		} catch (error) {
			console.log(error);
			setUploadStatus('error');
			setErrorMessage('Failed to upload file');
		}
	};

	const handleClear = () => {
		setFile(null);
		setUploadStatus('idle');
		setErrorMessage('');
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return (
		<div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
			<div className='w-full max-w-xl'>
				<div className='bg-white rounded-xl shadow-lg p-8'>
					<h1 className='text-2xl font-bold text-gray-800 mb-6'>
						IPA File Upload
					</h1>

					<div
						className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
							isDragging
								? 'border-blue-500 bg-blue-50'
								: 'border-gray-300 hover:border-gray-400'
						}`}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
					>
						<input
							type='file'
							accept='.ipa'
							onChange={handleFileSelect}
							className='hidden'
							ref={fileInputRef}
						/>

						<div className='flex flex-col items-center gap-4'>
							<Upload className='w-12 h-12 text-gray-400' />
							<div className='text-gray-600'>
								<p className='font-medium'>
									Drag and drop your IPA file here, or{' '}
									<button
										onClick={() =>
											fileInputRef.current?.click()
										}
										className='text-blue-500 hover:text-blue-600'
									>
										browse
									</button>
								</p>
								<p className='text-sm text-gray-500 mt-1'>
									Only .IPA files are allowed
								</p>
							</div>
						</div>
					</div>

					{errorMessage && (
						<div className='mt-4 p-4 bg-red-50 rounded-lg flex items-center gap-2 text-red-700'>
							<AlertCircle className='w-5 h-5' />
							<span>{errorMessage}</span>
						</div>
					)}

					{file && (
						<div className='mt-4 bg-gray-50 rounded-lg p-4'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center gap-2'>
									<div className='text-sm'>
										<p className='font-medium text-gray-700'>
											{file.name}
										</p>
										<p className='text-gray-500'>
											{(
												file.size /
												(1024 * 1024)
											).toFixed(2)}{' '}
											MB
										</p>
									</div>
								</div>
								<div className='flex items-center gap-2'>
									{uploadStatus === 'success' && (
										<CheckCircle className='w-5 h-5 text-green-500' />
									)}
									<button
										onClick={handleClear}
										className='p-1 hover:bg-gray-200 rounded-full'
									>
										<X className='w-5 h-5 text-gray-500' />
									</button>
								</div>
							</div>
						</div>
					)}

					<button
						onClick={handleUpload}
						disabled={!file || uploadStatus === 'success'}
						className={`mt-6 w-full py-2 px-4 rounded-lg font-medium ${
							!file || uploadStatus === 'success'
								? 'bg-gray-200 text-gray-500 cursor-not-allowed'
								: 'bg-blue-500 text-white hover:bg-blue-600'
						}`}
					>
						{uploadStatus === 'success'
							? 'Uploaded Successfully'
							: 'Upload File'}
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
