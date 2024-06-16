import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import formatDate from "../utils/Formatdate";
import SkeletonProfilePage from "../components/Skeletons/SkeletonProfilePage";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUserInfo, useUpdateProfile } from "../hooks/auth";
import { useDelete, useUpdate } from "../hooks/posts";
import { useFollowUnfollow } from "../hooks/followUnfollow";
const host = process.env.REACT_APP_BASE_URL;

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [profileUser, setProfileUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userID } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [editPostMode, setEditPostMode] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const { userInfo, user, isLoggedIn } = useUserInfo();
  const { deletePost, isdeleteLoading } = useDelete();
  const { updatePost, isUpdateLoading } = useUpdate();
  const { isfollowLoading, error, followUnfollow } = useFollowUnfollow();
  const { updateProfile } = useUpdateProfile();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const authToken = localStorage.getItem("auth");
  const getUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${host}/api/v1/auth/userprofile/${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setProfileUser(data.user);
        console.log(data.user);
        console.log(data.user._id);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const fetchPosts = async () => {
    const authToken = localStorage.getItem("auth");
    setIsLoading(true);
    try {
      const response = await fetch(
        `${host}/api/v1/posts/getpostsById/${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        setPosts(responseData.posts);
        console.log(responseData.posts);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setProfileUser(null);
        throw new Error(responseData.message);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
    }
  };

  //handle followubnfollow
  const handlefollowunfollow = async (userID) => {
    await followUnfollow(userID);
    await getUser();
  };

  // delete post function
  const handleDelete = async (postId) => {
    console.log(postId);
    await deletePost(postId);
    await fetchPosts();
  };

  //update post fiunction
  const handleEdit = (postId) => {
    const postToEdit = posts.find((post) => post._id === postId);
    if (postToEdit) {
      setEditingPostId(postId);
      setEditContent(postToEdit.content);
      setEditPostMode(true);
    }
  };

  const handleCancelEdit = () => {
    setEditPostMode(false);
    setEditingPostId(null);
    setEditContent("");
  };

  const handleSaveEdit = async (postId) => {
    console.log(
      "Saving edited content for post with ID:",
      postId,
      "New content:",
      editContent
    );
    await updatePost(postId, editContent);
    await fetchPosts();
    setEditPostMode(false);
    setEditingPostId(null);
    setEditContent("");
  };

  const handleUpdateProfile = async () => {
    console.log(
      "Updating profile with new username:",
      username,
      "and new bio:",
      description
    );
    await updateProfile(description, username);
    await getUser();
    setEditMode(false);
  };

  useEffect(() => {
    getUser();
    fetchPosts();
    userInfo();
    console.log("profileUser" + profileUser);
    console.log(profileUser.isFollowing);
    setUsername(profileUser?.username || "");
    setDescription(profileUser?.bio || "");
  }, []);

  const loggedInUserId = user ? user._id : null;

  if (isLoading) {
    return <SkeletonProfilePage />;
  }

  if (!profileUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
        <h1 className="text-4xl font-bold mb-4">The user does not exist</h1>
        <NavLink to="/">
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black focus:outline-none">
            Go Home
          </button>
        </NavLink>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="bg-white">
        <div className="container  mt-8 flex justify-center mx-auto p-10 bg-black">
          <div className="flex flex-col bg-black text-white w-96 p-4 rounded-lg  ">
            <div className="flex justify-between items-center">
              <button
                className="bg-white hover:bg-gray-500  text-black font-bold py-2 px-4 rounded text-2xl"
                onClick={() => navigate("/")}
              >
                <FaHome />
              </button>

              <h1 className="font-bold text-2xl">Profile</h1>
              {profileUser._id === loggedInUserId ? (
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
                  )}
                </>
              ) : null}
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
                <p className="text-xl font-sans mt-4">{profileUser?.bio}</p>
              )}

              <div className="mt-4 flex gap-4">
                <p className="text-gray-400 font-bold ">
                  Followers: {profileUser?.followers?.length || 0}{" "}
                </p>
                <p className="text-gray-400 font-bold">
                  Following: {profileUser?.following?.length || 0}
                </p>
              </div>

              <div className="mt-2">
                {profileUser._id === loggedInUserId ? null : (
                  <button
                    className={`text-sm px-3 py-1 rounded-full ${profileUser?.followers?.includes(loggedInUserId)
                        ? "bg-red-500 text-white hover:bg-red-700"
                        : "bg-blue-500 border border-blue-500 text-white  hover:bg-blue-700"
                      }`}
                    onClick={() => handlefollowunfollow(profileUser._id)}
                  >
                    {profileUser?.followers?.includes(loggedInUserId)
                      ? "Unfollow"
                      : "Follow"}
                  </button>
                )}
              </div>
            </div>
          </div>


          {/* this is where the posts page start */}

          <div className="ml-8 flex-grow bg-gray-500 p-10">
            <h3 className="font-bold text-xl text-black mb-4">Posts</h3>
            <ul className="space-y-10">
              {posts.length === 0 ? (
                <p className="text-white font-bold text-4xl items-center flex justify-center">
                  No posts yet
                </p>
              ) : null}
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-black text-white p-4 shadow-md rounded-lg"
                >
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full border border-6 "
                      src={profileUser.avatar?.url}
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
                  <div className="text-blue-600 text-sm mt-2">
                    {formatDate(post.createdAt)}
                  </div>
                  {post.author?.id === loggedInUserId && (
                    <div className="mt-2">
                      {editingPostId === post._id ? (
                        <>
                          <button
                            className="bg-green-700 hover:bg-green-900 text-white font-bold py-1 px-4 rounded mr-2"
                            onClick={() => handleSaveEdit(post._id)}
                          >
                            {isUpdateLoading ? "Updating..." : "Save Edit"}
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                            onClick={handleCancelEdit}
                          >
                            Cancel Edit
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2"
                            onClick={() => handleEdit(post._id)}
                          >
                            {isUpdateLoading ? "Updating..." : "Edit"}
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                            onClick={() => handleDelete(post._id)}
                          >
                            {isdeleteLoading ? "Deleting..." : "Delete"}
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
