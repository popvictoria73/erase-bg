export interface UploadFile extends File {
  preview?: string;
}

export type ProcessingStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

export interface ProcessedImage {
  original: string;
  processed: string;
}