
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImagePreview } from './components/ImagePreview';
import { upscaleImage } from './services/geminiService';
import { fileToGenerativePart } from './utils/imageUtils';
import { Button } from './components/Button';

export default function App(): React.ReactElement {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [upscaledImageUrl, setUpscaledImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    setOriginalFile(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setUpscaledImageUrl(null);
    setError(null);
  }, []);
  
  const handleReset = useCallback(() => {
    setOriginalFile(null);
    setOriginalImageUrl(null);
    setUpscaledImageUrl(null);
    setError(null);
    setIsLoading(false);
  }, []);

  const handleUpscale = async () => {
    if (!originalFile) return;

    setIsLoading(true);
    setError(null);
    setUpscaledImageUrl(null);

    try {
      const imagePart = await fileToGenerativePart(originalFile);
      const resultBase64 = await upscaleImage(imagePart);
      
      if (resultBase64) {
        const imageUrl = `data:${imagePart.inlineData.mimeType};base64,${resultBase64}`;
        setUpscaledImageUrl(imageUrl);
      } else {
        throw new Error("The AI model did not return an image. Please try again.");
      }

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during upscaling.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          {!originalImageUrl ? (
            <ImageUploader onImageUpload={handleImageUpload} />
          ) : (
            <div className="w-full flex flex-col items-center">
              <ImagePreview
                originalImageUrl={originalImageUrl}
                upscaledImageUrl={upscaledImageUrl}
                isLoading={isLoading}
                error={error}
              />
              <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Button
                  onClick={handleUpscale}
                  disabled={isLoading || !!upscaledImageUrl}
                  className="w-full"
                >
                  {isLoading ? 'Upscaling...' : upscaledImageUrl ? 'Upscaled Successfully!' : 'Upscale to 2K'}
                </Button>
                <Button
                  onClick={handleReset}
                  className="w-full bg-gray-600 hover:bg-gray-700"
                >
                  Upload New Image
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
