import React from 'react';
import { Home, Info, Mail, Image } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/about', icon: Info, label: 'About' },
    { path: '/contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <nav className="flex items-center space-x-6">
      {navItems.map(({ path, icon: Icon, label }) => (
        <Link
          key={path}
          to={path}
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors
            ${isActive(path)
              ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400'
            }`}
        >
          <Icon className="h-4 w-4" />
          <span className="font-medium">{label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;