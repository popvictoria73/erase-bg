import React, { useState, useCallback } from 'react';
import { UploadFile, ProcessingStatus, ProcessedImage } from '../types';
import UploadZone from './UploadZone';
import ProgressIndicator from './ProgressIndicator';
import ImageComparisonSlider from './ImageComparisonSlider';
import { removeImageBackground } from '../utils/imageProcessing';
import { Download } from 'lucide-react';

const ImageProcessor: React.FC = () => {
  const [file, setFile] = useState<UploadFile | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [processedImage, setProcessedImage] = useState<ProcessedImage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0] as UploadFile;
      
      // Create a preview URL for the file
      selectedFile.preview = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setStatus('uploading');
      setError(null);
      setProcessedImage(null);
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 300);

      // Simulate processing delay
      setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);
        setStatus('processing');
        
        // Process the image using our utility
        removeImageBackground(selectedFile)
          .then(result => {
            setProcessedImage(result);
            setStatus('complete');
          })
          .catch(err => {
            setError(err.message || 'Failed to process image');
            setStatus('error');
          });
      }, 3000);
    }
  }, []);

  const handleReset = () => {
    // Clean up object URLs to prevent memory leaks
    if (file?.preview) URL.revokeObjectURL(file.preview);
    if (processedImage) {
      URL.revokeObjectURL(processedImage.original);
      URL.revokeObjectURL(processedImage.processed);
    }
    
    setFile(null);
    setStatus('idle');
    setProgress(0);
    setProcessedImage(null);
    setError(null);
  };

  const handleDownload = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage.processed;
    link.download = 'background-removed.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4 text-center">
          {status === 'idle' ? 'Remove Image Background' : 
           status === 'complete' ? 'Background Removed!' : 
           'Processing Your Image...'}
        </h2>
        
        {status === 'idle' && (
          <UploadZone onDrop={handleFileDrop} />
        )}
        
        {(status === 'uploading' || status === 'processing') && (
          <ProgressIndicator 
            status={status} 
            progress={progress} 
            fileName={file?.name || ''}
          />
        )}
        
        {status === 'error' && (
          <div className="text-center p-6">
            <div className="mb-4 text-red-500 dark:text-red-400">
              {error || 'An error occurred during processing'}
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
        
        {status === 'complete' && processedImage && (
          <div className="space-y-6">
            <ImageComparisonSlider
              beforeImage={processedImage.original}
              afterImage={processedImage.processed}
            />
            
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleDownload}
                className="flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Download Result</span>
              </button>
              
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-lg transition-colors"
              >
                Process Another Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageProcessor;