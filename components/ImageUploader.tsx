
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File | null) => {
    setError(null);
    if (file) {
      if (['image/jpeg', 'image/png'].includes(file.type)) {
        onImageUpload(file);
      } else {
        setError('Invalid file type. Please upload a JPG or PNG image.');
      }
    }
  }, [onImageUpload]);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl text-center">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`p-10 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
          isDragging ? 'border-blue-400 bg-gray-800/50 scale-105' : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800/30'
        }`}
      >
        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center justify-center space-y-4 text-gray-400">
          <UploadIcon className="w-16 h-16" />
          <p className="text-xl font-semibold">Drag & drop your image here</p>
          <p>or</p>
          <p className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium">
            Browse Files
          </p>
          <p className="text-sm text-gray-500">Supports: JPG, PNG</p>
        </div>
      </div>
      {error && <p className="mt-4 text-red-400">{error}</p>}
    </div>
  );
};
