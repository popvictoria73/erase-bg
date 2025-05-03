import React from 'react';

const Samples: React.FC = () => {
  const sampleImages = [
    {
      id: 1,
      title: 'Portrait',
      url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      description: 'Perfect for removing backgrounds from portrait photos'
    },
    {
      id: 2,
      title: 'Product',
      url: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg',
      description: 'Ideal for e-commerce product photos'
    },
    {
      id: 3,
      title: 'Nature',
      url: 'https://images.pexels.com/photos/3608263/pexels-photo-3608263.jpeg',
      description: 'Great for isolating subjects in nature photography'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">Sample Images</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleImages.map(image => (
          <div key={image.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                {image.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {image.description}
              </p>
              <button
                onClick={() => window.open(image.url, '_blank')}
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Download Sample
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Samples;