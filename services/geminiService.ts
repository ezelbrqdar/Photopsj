
import { GoogleGenAI, Modality } from "@google/genai";
import { GenerativePart } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = 'gemini-2.5-flash-image-preview';

export const upscaleImage = async (imagePart: GenerativePart): Promise<string | null> => {
  try {
    const prompt = 'Upscale this image to 2K resolution (2048x1080). Enhance details, reduce noise, and improve overall clarity and sharpness. Do not add, remove, or change any objects in the image. Maintain the original aspect ratio as closely as possible within the 2K frame.';

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          imagePart,
          { text: prompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });
    
    // Find the first image part in the response
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData && part.inlineData.data) {
        return part.inlineData.data;
      }
    }

    // If no image part is found
    return null;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to upscale image with AI. Please check the console for more details.");
  }
};
