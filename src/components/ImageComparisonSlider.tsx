import React, { useState, useRef, useEffect } from 'react';

interface ImageComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
}

const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({ 
  beforeImage, 
  afterImage 
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return;
    
    const { left, width } = containerRef.current.getBoundingClientRect();
    const position = ((clientX - left) / width) * 100;
    
    // Constrain the position between 0 and 100
    const constrainedPosition = Math.max(0, Math.min(100, position));
    setSliderPosition(constrainedPosition);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateSliderPosition(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        updateSliderPosition(e.touches[0].clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-lg h-[280px] sm:h-[400px] select-none touch-none"
    >
      {/* Original image (before) - full width */}
      <div className="absolute inset-0">
        <img 
          src={beforeImage} 
          alt="Original" 
          className="w-full h-full object-contain bg-[#f0f0f0] dark:bg-slate-900"
        />
      </div>
      
      {/* Processed image (after) - controlled by slider */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={afterImage} 
          alt="Processed" 
          className="w-full h-full object-contain absolute right-0 transform translate-x-full bg-[#f0f0f0] dark:bg-slate-900"
          style={{ 
            transform: `translateX(${100 - (100 / sliderPosition) * 100}%)`,
            width: `${100 / (sliderPosition / 100)}%`
          }}
        />
      </div>
      
      {/* Slider control */}
      <div 
        className="absolute inset-y-0"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        {/* Vertical line */}
        <div className="absolute inset-y-0 w-0.5 bg-white shadow-md"></div>
        
        {/* Drag handle */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="w-4 flex items-center justify-center">
            <div className="flex flex-col space-y-1">
              <div className="w-0.5 h-3 bg-slate-400 rounded-full"></div>
              <div className="w-0.5 h-3 bg-slate-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
        Original
      </div>
      <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
        Processed
      </div>
    </div>
  );
};

export default ImageComparisonSlider;