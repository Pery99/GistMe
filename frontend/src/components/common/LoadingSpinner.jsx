import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <div className="absolute w-full h-full border-4 border-gray-100 rounded-full"></div>
          <div className="absolute w-full h-full border-4 border-primary-500 rounded-full 
                         animate-[spin_1s_ease-in-out_infinite] border-t-transparent"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
