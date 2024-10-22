import React from 'react';

const AdviceModalSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col items-center space-y-4">
      <div className="bg-gray-300 h-64 w-64 rounded"></div>
      {/* Image placeholder */}
      <div className="h-8 bg-gray-300 rounded w-3/4"></div>
      {/* Text placeholder */}
      <div className="h-10 bg-gray-300 rounded w-1/2"></div>
      {/* Button placeholder */}
    </div>
  );
};

export default AdviceModalSkeleton;