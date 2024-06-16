import React from 'react'

import { FaHome } from 'react-icons/fa'

const ProfileCard = ({
    profileUser,
    loggedInUserId,
    editMode,
    handleEditClick,
    username,
    setUsername,
    description,
    setDescription,
    handleUpdateProfile,
    isfollowLoading,
    handlefollowunfollow,
    isDropdownOpen,
    toggleDropdown,
    isFollowing,
    isFollowLoading,
    navigate


}) => {
  return (
    <div className='bg-black '>
            <div>
        <div className="flex justify-between items-center ">

        <button
              className="bg-white hover:bg-gray-500  text-black font-bold py-2 px-4 rounded text-2xl"
                onClick={() =>navigate('/') }
            >
                <FaHome />
            </button>
      
          <h1 className="font-bold text-2xl">Profile</h1>
          {
            profileUser._id ===loggedInUserId? 
            (
              <>
               {editMode ? (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleUpdateProfile}
            >
              Save Profile
            </button>
          ) : (
            <button
              className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
              onClick={handleEditClick}
            >
              Edit Profile
            </button>
          ) 
          }
              </>
            ):null
          }
         
        </div>
        <hr className="mt-4" />

        <img
          className="h-26 w-26 rounded-full border border-gray-300 mt-10"
          src={profileUser?.avatar?.url}
          alt={profileUser?.username}
        />

        <hr className="mt-10" />
        <div className="ml-4 mt-2">
          {editMode ? (
            <>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="font-bold text-xl focus:outline-none text-black p-2 rounded-lg"
              />
              <p className="text-gray-600">@{profileUser?.username}</p>
            </>
          ) : (
            <>
              <h2 className="font-bold text-4xl">{profileUser?.username}</h2>
              <p className="text-gray-600">@{profileUser?.username}</p>
            </>
          )}

         
          {editMode ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-xl font-sans mt-4 text-black resize-none p-2 rounded-lg"
            />
          ) : (
            <p className="text-xl font-sans mt-4">{profileUser?.bio }</p>
          )}

          <div className="mt-4 flex gap-4">
            <p className="text-gray-400 font-bold ">Followers: {profileUser?.followers?.length || 0} </p>
            <p className="text-gray-400 font-bold">Following: {profileUser?.following?.length || 0}</p>
          </div>

          <div className='mt-2'>
            {
              profileUser._id ===loggedInUserId? null : (

            
          <button
      className={`text-sm px-3 py-1 rounded-full ${
     profileUser?.followers?.includes(loggedInUserId)
      ? 'bg-red-500 text-white hover:bg-red-700' 
      : 'bg-blue-500 border border-blue-500 text-white  hover:bg-blue-700'
  }`}
  
  onClick={() => handlefollowunfollow(profileUser._id)}
>
  {profileUser?.followers?.includes(loggedInUserId) ? 'Unfollow' : 'Follow'}
</button>
              )
            }
      </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard