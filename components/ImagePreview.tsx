import React from 'react';
import { Spinner } from './Spinner';
import { DownloadIcon } from './icons/DownloadIcon';

interface ImagePreviewProps {
  originalImageUrl: string;
  upscaledImageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const PreviewBox: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <div className={`flex flex-col w-full ${className}`}>
    <h3 className="text-xl font-semibold mb-3 text-center text-gray-400">{title}</h3>
    <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center border border-gray-700">
      {children}
    </div>
  </div>
);

export const ImagePreview: React.FC<ImagePreviewProps> = ({ originalImageUrl, upscaledImageUrl, isLoading, error }) => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <PreviewBox title="Original">
        <img src={originalImageUrl} alt="Original" className="object-contain w-full h-full" />
      </PreviewBox>
      <PreviewBox title="Upscaled to 2K">
        {isLoading && (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <Spinner />
            <p className="mt-4 text-lg animate-pulse">AI is enhancing your image...</p>
          </div>
        )}
        {error && (
          <div className="p-4 text-center text-red-400">
            <p className="font-semibold">Upscaling Failed</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        )}
        {upscaledImageUrl && !isLoading && (
          <div className="relative w-full h-full group">
            <img src={upscaledImageUrl} alt="Upscaled" className="object-contain w-full h-full" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href={upscaledImageUrl}
                download="upscaled-2k-image.png"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <DownloadIcon className="w-5 h-5" />
                Download 2K Image
              </a>
            </div>
          </div>
        )}
      </PreviewBox>
    </div>
  );
};
