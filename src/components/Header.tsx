import React from 'react';
import { Moon, Sun, Rabbit } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Navigation from './Navigation';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-slate-800 shadow-sm px-4 md:px-8 py-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Rabbit className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
            ErasePic
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <Navigation />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-slate-700" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header