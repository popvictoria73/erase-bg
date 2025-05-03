import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage } from 'lucide-react';

interface UploadZoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 10485760, // 10MB
  });

  // Dynamic border color based on drag state
  const getBorderColor = useCallback(() => {
    if (isDragAccept) return 'border-green-500';
    if (isDragReject) return 'border-red-500';
    if (isDragActive) return 'border-blue-500';
    return 'border-slate-300 dark:border-slate-600';
  }, [isDragActive, isDragAccept, isDragReject]);

  return (
    <div 
      {...getRootProps()} 
      className={`
        border-2 border-dashed rounded-xl p-8 
        text-center cursor-pointer 
        transition-colors duration-200 
        hover:bg-slate-50 dark:hover:bg-slate-700/40
        focus:outline-none focus:ring-2 focus:ring-blue-500/50
        ${getBorderColor()}
      `}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full">
          {isDragActive ? (
            <FileImage className="h-12 w-12 text-blue-500" />
          ) : (
            <Upload className="h-12 w-12 text-blue-500" />
          )}
        </div>
        
        <div className="space-y-2 text-center">
          <p className="text-lg font-medium text-slate-800 dark:text-white">
            {isDragActive 
              ? 'Drop the image here...' 
              : 'Drag & drop an image here, or click to select'}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Supports JPG, PNG and WebP (max 10MB)
          </p>
        </div>
        
      
      </div>
    </div>
  );
};

export default UploadZone;