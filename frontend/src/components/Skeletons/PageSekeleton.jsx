import React from 'react';
import SkeletonSidebar from './SkeletonSidebar';

const PageSkeleton = () => {
  return (
    <div className="flex h-screen bg-gray-800 text-white">
      {/* Sidebar Skeleton */}
      <div className="w-1/6 ">
     <SkeletonSidebar />
      </div>

   
      <div className="flex-1 p-4 ml-24">
      <div className="w-full  my-10">
      <div className="animate-pulse w-full border border-black rounded px-4 py-3 mb-4 bg-gray-200"></div>
      <div className="animate-pulse w-full border border-black rounded px-4 py-3 mb-4 bg-gray-200"></div>
      <button
        type="submit"
        className="animate-pulse mt-4 bg-gray-200 border border-black text-gray-200 font-bold py-2 px-4 rounded focus:outline-none"
      >
        Post
      </button>
    </div>
      <div className="bg-black text-white p-4 shadow-md rounded-lg">
    
      <div className="mb-4">
       
      </div>
        <div className="flex items-center">
          <div className="h-10 w-10 bg-gray-400 rounded-full animate-pulse" />
          <div className="ml-4 h-6 w-32 bg-gray-400 rounded animate-pulse" />
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-6 bg-gray-400 rounded animate-pulse" />
          <div className="h-6 bg-gray-400 rounded animate-pulse" />
          <div className="h-6 bg-gray-400 rounded animate-pulse" />
        </div>
        <div className="flex items-center mt-4">
          <div className="h-8 w-16 bg-gray-400 rounded-full animate-pulse mr-2" />
          <div className="h-8 w-16 bg-gray-400 rounded-full animate-pulse mr-2" />
        </div>
      </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
