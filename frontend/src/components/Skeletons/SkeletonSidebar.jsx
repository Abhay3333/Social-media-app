import React from 'react';

const SkeletonSidebar = () => {
  return (
    <div className="bg-black text-white fixed top-0 w-1/6 p-4 h-screen">
      <div className="animate-pulse">
        <div className="h-10 w-10 rounded-full bg-gray-500 mr-3 mb-4"></div>
        <div className='mb-4'>
          <div className="h-4 bg-gray-500 w-24 mb-1"></div>
          <div className="h-3 bg-gray-500 w-16"></div>
        </div>
      </div>
      <ul className="space-y-4">
        <li className="flex items-center space-x-3 animate-pulse">
          <div className="h-6 w-6 bg-gray-500 rounded-full"></div>
          <div className="h-3 bg-gray-500 w-16"></div>
        </li>
        <li className="flex items-center space-x-3 animate-pulse">
          <div className="h-6 w-6 bg-gray-500 rounded-full"></div>
          <div className="h-3 bg-gray-500 w-24"></div>
        </li>
        <li className="flex items-center space-x-3 animate-pulse">
          <div className="h-6 w-6 bg-gray-500 rounded-full"></div>
          <div className="h-3 bg-gray-500 w-20"></div>
        </li>
        <li className="flex items-center space-x-3 animate-pulse">
          <div className="h-6 w-6 bg-gray-500 rounded-full"></div>
          <div className="h-3 bg-gray-500 w-28"></div>
        </li>
      </ul>
    </div>
  );
};

export default SkeletonSidebar;
