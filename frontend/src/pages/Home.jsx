import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useGetPosts } from '../hooks/posts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faL } from '@fortawesome/free-solid-svg-icons';
import PostCard from '../components/Postcard';
import { useAddPost } from '../hooks/posts';

import BackToTopButton from '../components/BackToTopButton';
const url = process.env.REACT_APP_BASE_URL;

const host = `${url}/api/v1/posts`

const Home = () => {
  const [posts, setPosts] = useState([]);

  const { addPost } = useAddPost();
  const authToken = localStorage.getItem('auth');

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${host}/getposts`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        }
      });
      const responseData = await response.json();
      if (response.ok) {
        setPosts(responseData.posts);
        console.log(responseData.posts)
      } else {
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let content = e.target[0].value;

    try {
      await addPost(content);
      await fetchPosts(); 
      content = ''
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchPosts();
  }, [])

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: post.comments + 1 } : post
      )
    );
  };

  return (
    
<div className="flex flex-col lg:flex-row bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 h-full">
  <Sidebar />

  <div className="container lg:w-3/4 mx-auto px-10 py-8 lg:ml-80">
    <div className="mb-8">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Write your post here..."
          name="content"
        ></textarea>
        <button
          type="submit"
          className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold rounded-lg hover:bg-gradient-to-r hover:from-indigo-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Post
        </button>
      </form>
    </div>

    <div className="space-y-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-6 bg-white rounded-xl shadow-xl"
        >
          <PostCard post={post} handleLike={handleLike} handleComment={handleComment} />
        </div>
      ))}
    </div>

    <BackToTopButton />
  </div>
</div>
 

    
  );
};

export default Home;
