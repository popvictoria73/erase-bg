import React from 'react';
import ImageProcessor from '../components/ImageProcessor';
import { Image } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const sampleImages = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      title: 'Portrait Photo'
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg',
      title: 'Product Photo'
    }
  ];

  return (
    <div className="flex-grow p-4 md:p-8">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
          Remove Image Backgrounds Instantly
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Transform your photos with our AI-powered background removal tool. Perfect for e-commerce, 
          social media, or personal projects - get professional results in seconds.
        </p>
      </div>

      <div className="mb-12">
        <ImageProcessor />
      </div>

      <div className="mb-12 mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2 flex items-center justify-center">
            <Image className="h-5 w-5 mr-2 text-blue-500" />
            Try with these sample images
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Download and test our tool with these sample images
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sampleImages.map(image => (
            <div key={image.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-medium text-slate-800 dark:text-white mb-3">
                  {image.title}
                </h4>
                <button
                  onClick={() => window.open(image.url, '_blank')}
                  className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Download Sample
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;