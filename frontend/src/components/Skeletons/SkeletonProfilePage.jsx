import React from 'react';

const SkeletonProfilePage = () => {
  return (
    <div className="container mx-auto mt-8 flex justify-center">
      <div className="flex flex-col bg-black text-white w-96 p-4 rounded-lg">
        <div className="animate-pulse">
          <div className="h-26 w-26 rounded-full bg-gray-500 mt-10 mb-4"></div>
          <hr className="mt-10" />
          <div className="ml-4 mt-2">
            <div className="h-8 bg-gray-500 w-32 mb-2"></div>
            <div className="h-6 bg-gray-500 w-20"></div>
            <div className="mt-4">
              <div className="h-6 bg-gray-500 w-16"></div>
              <div className="h-6 bg-gray-500 w-24"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="ml-8 flex-grow bg-gray-500 p-10">
        <h3 className="font-bold text-xl text-black">Posts</h3>
        <ul className="space-y-10">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="bg-black text-white p-4 shadow-md rounded-lg animate-pulse">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-500 border border-6 mr-3"></div>
              </div>
              <div className="h-4 bg-gray-500 w-32 mt-2"></div>
              <div className="h-3 bg-gray-500 w-64"></div>
              <div className="flex items-center mt-4">
                <div className="h-6 w-6 bg-gray-500 rounded-full"></div>
                <div className="h-3 bg-gray-500 w-16 ml-2"></div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkeletonProfilePage;
