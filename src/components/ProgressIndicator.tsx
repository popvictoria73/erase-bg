import React from 'react';
import { ProcessingStatus } from '../types';
import { FileUp, Cog } from 'lucide-react';

interface ProgressIndicatorProps {
  status: ProcessingStatus;
  progress: number;
  fileName: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  status, 
  progress,
  fileName 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center">
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Circular progress indicator */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle 
              className="text-slate-200 dark:text-slate-700 stroke-current" 
              strokeWidth="8" 
              cx="50" 
              cy="50" 
              r="40" 
              fill="transparent"
            />
            <circle 
              className="text-blue-500 stroke-current" 
              strokeWidth="8" 
              strokeLinecap="round" 
              cx="50" 
              cy="50" 
              r="40" 
              fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * progress) / 100}
              style={{
                transition: 'stroke-dashoffset 0.3s ease-in-out'
              }}
            />
          </svg>
          <div className="absolute">
            {status === 'uploading' ? (
              <FileUp className="h-8 w-8 text-blue-500 animate-pulse" />
            ) : (
              <Cog className="h-8 w-8 text-blue-500 animate-spin" />
            )}
          </div>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <div className="text-slate-800 dark:text-white font-medium">
          {status === 'uploading' ? 'Uploading image...' : 'Removing background...'}
        </div>
        
        <div className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-full">
          {fileName}
        </div>
        
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {progress}% {status === 'uploading' ? 'uploaded' : 'processed'}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;