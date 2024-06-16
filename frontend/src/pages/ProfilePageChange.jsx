
import React, { useEffect, useState } from 'react';
import { NavLink, Navigate, useParams } from 'react-router-dom';
import SkeletonProfilePage from '../components/Skeletons/SkeletonProfilePage';
import { useNavigate } from 'react-router-dom';
import { useUserInfo ,useUpdateProfile} from '../hooks/auth';
import { useDelete,useUpdate } from '../hooks/posts';
import { useFollowUnfollow } from '../hooks/followUnfollow';
import ProfilePostsComponent from '../components/ProfilePageComponets/ProfilePosts';
import ProfileCard from '../components/ProfilePageComponets/ProfileCard';

const host = process.env.REACT_APP_BASE_URL;

  

const ProfilePageChange = () => {

    const [posts, setPosts] = useState([]);
    const [profileUser, setProfileUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { userID } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [editPostMode,setEditPostMode]=useState(false);
    const [username, setUsername] = useState(profileUser?.username);
    const navigate=useNavigate();
    const [description, setDescription] = useState(profileUser?.bio );
    const [editContent, setEditContent] = useState('');
    const [editingPostId, setEditingPostId] = useState(null);
    const { userInfo, user, isLoggedIn } = useUserInfo();
    const { deletePost,isdeleteLoading } = useDelete();
    const { updatePost, isUpdateLoading } = useUpdate();
    const {isfollowLoading, error, followUnfollow}=useFollowUnfollow();
    const {updateProfile}=useUpdateProfile();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    
  
    const handleEditClick = () => {
      setEditMode(true);
    };
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const authToken=localStorage.getItem('auth');
    const getUser = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`${host}/api/v1/auth/userprofile/${userID}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setProfileUser(data.user);
            console.log(data.user)
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
      }

    const fetchPosts = async () => {
        const authToken=localStorage.getItem('auth');
        setIsLoading(true);
        try {
            const response = await fetch(`${host}/api/v1/posts/getpostsById/${userID}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    }
                },
            );
            const responseData = await response.json();
            if (response.ok) {
                setPosts(responseData.posts);
                console.log(responseData.posts)
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
    }

    //handle followubnfollow
    const handlefollowunfollow= async(userID)=>{
     await followUnfollow(userID);
     await getUser();

    }

    // delete post function
    const handleDelete=async(postId)=>{
      console.log(postId);
     await deletePost(postId);
     await fetchPosts();
    }

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
      setEditContent('');
    };
  
    const handleSaveEdit = async (postId) => {
      console.log('Saving edited content for post with ID:', postId, 'New content:', editContent);
      await updatePost(postId, editContent);
      await fetchPosts();
      setEditPostMode(false);
      setEditingPostId(null);
      setEditContent('');
    };
  
    const handleUpdateProfile = async () => {
      console.log('Updating profile with new username:', username, 'and new bio:', description);
      await updateProfile(description, username);
      await getUser();
      setEditMode(false);
    };


    useEffect(()=>{
        getUser();
        fetchPosts();
        userInfo();
        console.log('profileUser'+ profileUser)
        console.log(profileUser.isFollowing)
        
    },[])

    const loggedInUserId=user? user._id : null;



    if(isLoading  ){
        return(
            <SkeletonProfilePage />
        )
      
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
    <div className="container  mt-8 flex justify-center mx-auto p-10">

{/* profile component */}
    <div className="flex flex-col bg-black text-white w-96 p-4 rounded-lg  ">
       <ProfileCard 
         profileUser={profileUser}
            editMode={editMode}
            handleEditClick={handleEditClick}
            username={username}
            setUsername={setUsername}
            description={description}
            setDescription={setDescription}
            handleUpdateProfile={handleUpdateProfile}
            loggedInUserId={loggedInUserId}
            isfollowLoading={isfollowLoading}
            handlefollowunfollow={handlefollowunfollow}
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            isFollowing={profileUser.isFollowing}
            isFollowLoading={isfollowLoading}
          />


    
      </div>


{/* posts page */}
      <div className="ml-8 flex-grow bg-gray-500 p-10">
        <h3 className="font-bold text-xl text-black mb-4">Posts</h3>
        <ul className="space-y-10">
       

          {posts.length === 0 ? (
            <p className="text-white font-bold text-4xl items-center flex justify-center">No posts yet</p>
          ) : null}
          {posts.map((post) => (
            <ProfilePostsComponent
            key={post._id}
            post={post}
            profileUser={profileUser}
            loggedInUserId={loggedInUserId}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleCancelEdit={handleCancelEdit}
            handleSaveEdit={handleSaveEdit}
            editPostMode={editPostMode}
            editingPostId={editingPostId}
            editContent={editContent}
            isUpdateLoading={isUpdateLoading}
            isdeleteLoading={isdeleteLoading}
            setEditContent={setEditContent}


            />

            
          ))}
        </ul>
      </div>
    </div>

  );
};

export default ProfilePageChange;
