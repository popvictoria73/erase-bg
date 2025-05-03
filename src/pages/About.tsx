import React from 'react';
import { Zap, Shield, Clock } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Remove backgrounds from your images in seconds with our advanced AI technology.'
    },
    {
      icon: Shield,
      title: 'Secure Upload',
      description: 'Your images are processed securely and deleted immediately after processing.'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access our background removal tool whenever you need it, day or night.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
          About ErasePic
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Our AI-powered background removal tool helps you create professional-looking images
          in seconds. Perfect for e-commerce, social media, or personal projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map(({ icon: Icon, title, description }) => (
          <div key={title} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="h-12 w-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
              <Icon className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;