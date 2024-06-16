import React from 'react';
import formatDate from '../../utils/Formatdate';
import { useUserInfo } from '../../hooks/auth';
import { useDelete, useUpdate } from '../../hooks/posts';
import { useFollowUnfollow } from '../../hooks/followUnfollow';
import { useUpdateProfile } from '../../hooks/auth';
import { useState } from 'react';



const ProfilePostsComponent = ({
  post,
  loggedInUserId,
  handleDelete,
  handleEdit,
  editingPostId,
    isdeleteLoading,
  isUpdateLoading,
  handleSaveEdit,
  handleCancelEdit,
  profileUser,
  editContent,
  setEditContent
}) => {

    
  



  return (
    <div className=" flex-grow bg-gray-500 ">

      <ul className="space-y-2">
     
          <div key={post._id} className="bg-black text-white p-4 shadow-md rounded-lg">
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full border border-6"
                src={profileUser?.avatar?.url}
                alt={profileUser?.username}
              />
            </div>

            {editingPostId === post._id ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="text-sm font-sans mt-4 text-black w-full p-2 rounded-lg"
              />
            ) : (
              <p className="text-white mt-2">{post.content}</p>
            )}
            <div className="text-blue-600 text-sm mt-2">{formatDate(post.createdAt)}</div>
            {post.author?.id === loggedInUserId && (
              <div className="mt-2">
                {editingPostId === post._id ? (
                  <>
                    <button
                      className="bg-green-700 hover:bg-green-900 text-white font-bold py-1 px-4 rounded mr-2"
                      onClick={() => handleSaveEdit(post._id)}
                    >
                      {isUpdateLoading ? 'Updating...' : 'Save Edit'}
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded" onClick={handleCancelEdit}>
                      Cancel Edit
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2"
                      onClick={() => handleEdit(post._id)}
                    >
                      {isUpdateLoading ? 'Updating...' : 'Edit'}
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                      onClick={() => handleDelete(post._id)}
                    >
                      {isdeleteLoading ? 'Deleting...' : 'Delete'}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

      </ul>
    </div>
  );
};

export default ProfilePostsComponent;
