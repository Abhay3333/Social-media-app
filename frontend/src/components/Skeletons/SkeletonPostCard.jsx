const SkeletonPostCard = () => {
    return (
      <div className="bg-black text-white p-4 shadow-md rounded-lg">
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
    );
  };
  
    export default SkeletonPostCard;