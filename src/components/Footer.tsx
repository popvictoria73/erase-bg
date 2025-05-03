import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-4 px-4 md:px-8 bg-white dark:bg-slate-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-2 sm:mb-0">
          © {new Date().getFullYear()} ErasePic. All rights reserved.
        </p>
        <div className="flex items-center space-x-1 text-sm text-slate-600 dark:text-slate-300">
          <span>Made with</span>
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          <span>by ErasePic</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;