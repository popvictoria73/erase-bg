import { UploadFile, ProcessedImage } from '../types';

const API_KEY = 'CZ4aS24iZVSmXduxAQYRHFsE';
const API_ENDPOINT = 'https://api.remove.bg/v1.0/removebg';

export const removeImageBackground = async (file: UploadFile): Promise<ProcessedImage> => {
  try {
    const formData = new FormData();
    formData.append('image_file', file);
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'X-Api-Key': API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to remove background');
    }

    const blob = await response.blob();
    const processedImageUrl = URL.createObjectURL(blob);

    return {
      original: file.preview || '',
      processed: processedImageUrl
    };
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to process image');
  }
};