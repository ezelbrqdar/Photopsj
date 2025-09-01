
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
          AI Image Upscaler 2K
        </h1>
        <p className="text-lg text-gray-400 mt-2">
          Transform your images to stunning 2K resolution with the power of Gemini AI.
        </p>
      </div>
    </header>
  );
};
