import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom'; // Assuming you have imported the NavLink correctly.
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';
import { useAddComments,useDeleteComment } from '../hooks/comments';
import { useUserInfo } from '../hooks/auth';
const host = process.env.REACT_APP_BASE_URL;



const CommentsPage = () => {
  const [comment, setComment] = useState('');
  const [posts,setPost]=useState([])
  const [comments,setComments]=useState([]);
  const { addComment,isLoading } = useAddComments();
  const { userInfo, user, isLoggedIn } = useUserInfo();
  const { deleteComment,isdeleteLoading } = useDeleteComment();

  const { postID } = useParams();


  const handleChange = (e) => {
    setComment(e.target.value);
  };

 
  const formatDate = (date) => {

    return new Date(date).toLocaleDateString('en-US');
  };

  const fetchPostByID=async()=>{
    try {

      const authToken = localStorage.getItem('auth');
        const response=await fetch(`${host}/api/v1/posts/getpost/${postID}`,{
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }

        })
        const responseData=await response.json();
        if(response.ok){
          setPost([responseData.post]);
        }else{
          throw new Error(responseData.message)
        }

    } catch (error) {
      console.log(error.message)

      
    }
  }

  const fetchCOmmentsByPostID=async()=>{

    try {

      const authToken = localStorage.getItem('auth');
        const response=await fetch(`${host}/api/v1/comments/getcomments/${postID}`,{
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }

        })
        const responseData=await response.json();
        if(response.ok){
        
          setComments(responseData.comments)
        }else{
          throw new Error(responseData.message)
        }

    } catch (error) {
      console.log(error.message)

      
    }

  }

  const handledeletecomment=async(commentID)=>{
    try {
      await deleteComment(commentID);
      await fetchCOmmentsByPostID();
    }
    catch (error) {
      console.log(error.message)
    } 
  }

  const handleSubmit =async () => {
    console.log('Comment:', comment);
    toast.success('Comment added successfully');
    await addComment(comment, postID);
    await fetchCOmmentsByPostID();
    setComment('');
    

  };



  useEffect(()=>{
    fetchPostByID();
    fetchCOmmentsByPostID()
    userInfo();
  },[])

  const loggedInUserId=user? user._id : null;
  
  return (
<div className="flex flex-col text-white bg-white ">
  <div className="flex-1 flex">
    <div className="w-1/4">
      <Sidebar />
    </div>
    <div className="w-3/5 p-4 ml-10">
      <h1 className="text-black text-2xl font-bold mb-4">Post</h1>
      {posts.length === 0 ? (
        <div className="bg-black text-white p-4 shadow-md rounded-lg mb-4">
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
      ) : null

        }
      {posts.map((post) => (
        <div key={post?._id} className="bg-black text-white p-4 shadow-md rounded-lg mb-4">
          <NavLink to={`/profile/${post?.author?.id}`}>
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full border border-6"
                src={post?.author?.avatar}
                alt={post?.author?.name}
              />
              <p className="ml-4 text-white font-bold">{post?.author?.name}</p>
            </div>
          </NavLink>
          <p className="text-white mt-2">{post?.content}</p>
         
          <div className="text-blue-600 text-sm mt-2">{formatDate(post?.createdAt)}</div>
        </div>
      ))}

      <div className="mb-4">
        <h2 className="text-black text-lg font-bold mb-2">Previous Comments</h2>
        {comments.length === 0 ? (
          <div className="bg-black text-white p-4 shadow-md rounded-lg mb-4">
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
        ) : null}
        {comments.map((comment) => (
          <div key={comment?._id} className="bg-black text-white p-4 shadow-md rounded-lg mb-4">
            <NavLink to={`/profile/${comment?.commentedBy?.id}`}>
              <div className="flex items-center">
                <img

                  className="h-10 w-10 rounded-full border border-6"
                  src={comment?.commentedBy?.avatar}
                  alt={comment?.commentedBy?.name}
                />
                <p className="ml-4 text-white font-bold">{comment?.commentedBy?.name}</p>
              </div>
            </NavLink>
            <p className="text-white mt-2">{comment?.comment}</p>
            <div className='flex gap-4'>
            <div className="text-blue-600 text-sm mt-2">{formatDate(comment?.createdAt)}</div>

            {loggedInUserId ===comment ?.commentedBy?.id ? (
             <button
             className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt"
             onClick={() => handledeletecomment(comment?._id)}
           >
             {isdeleteLoading ? 'Deleting...' : 'Delete'}
           </button>
            ) : null}
           
            </div>
            
          

          </div>
        ))}
      </div>

      <h2 className="text-black text-lg font-bold mb-2">Write a Comment</h2>
      <textarea
        value={comment}
        onChange={handleChange}
        placeholder="Write your comment here..."
        className=" text-black p-2 w-full rounded-lg mb-4n bg-gray-300 mb-2"
        rows="4"
      ></textarea>
      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black focus:outline-none"
      >
        Submit Comment
      </button>
    </div>
  </div>
</div>

  );
};

export default CommentsPage;
