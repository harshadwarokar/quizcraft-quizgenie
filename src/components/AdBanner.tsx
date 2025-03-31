
import React from 'react';

interface AdBannerProps {
  size: 'small' | 'medium' | 'large';
  className?: string;
}

const AdBanner = ({ size, className = '' }: AdBannerProps) => {
  let height = 'h-[90px]';
  let label = 'Advertisement';
  
  if (size === 'medium') {
    height = 'h-[250px]';
  } else if (size === 'large') {
    height = 'h-[400px]';
  }
  
  return (
    <div className={`w-full my-4 ${className}`}>
      <div className="text-sm text-gray-500 text-center mb-1">{label}</div>
      <div className={`${height} bg-gray-100 flex items-center justify-center border border-dashed border-gray-300 rounded-md`}>
        <p className="text-gray-400">Google Ad Space</p>
      </div>
    </div>
  );
};

export default AdBanner;
