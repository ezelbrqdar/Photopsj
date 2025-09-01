
import { GenerativePart } from '../types';

export const fileToGenerativePart = (file: File): Promise<GenerativePart> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error("Failed to read file as string."));
      }
      const base64Data = reader.result.split(',')[1];
      if (!base64Data) {
        return reject(new Error("Failed to extract base64 data from file."));
      }
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
