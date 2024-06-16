import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const url = process.env.REACT_APP_BASE_URL;



const host = `${url}/api/v1/posts`
const authToken = localStorage.getItem('auth');


export function useGetPosts() {
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const fetchPosts = async () => {
        setisLoading(true);
        setError(null);
        try {
            const response = await fetch(`${host}/getposts`);
            const responseData = await response.json();
            if (response.ok) {
                setData(responseData.posts);
            }
            else {
                throw new Error(responseData.message);
            }
            setisLoading(false);
        }
        catch (err) {
            setError(err.message);
            setisLoading(false);
        }
    }

    return { isLoading, error, data, fetchPosts };


}

export function useAddPost() {
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const addPost = async (content) => {
        setisLoading(true);
        setError(null);
        try {
            const authToken = localStorage.getItem('auth');


            const response = await fetch(`${host}/createpost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    content
                }),
            });
            const responseData = await response.json();
            if (response.ok) {
                setData(responseData.post);
                toast.success('post added successfully');
            } else {
                toast.error(responseData.msg);
                throw new Error(responseData.message);

            }
            setisLoading(false);
        } catch (err) {
            setError(err.message);
            setisLoading(false);
        }
    };

    return { isLoading, error, data, addPost };
}


export function useDelete() {

    const [isdeleteLoading, setdeleteisLoading] = useState(false);

    const deletePost = async (postId) => {
        setdeleteisLoading(true);
        const authToken = localStorage.getItem('auth');

        try {
            const response = await fetch(`${host}/deletepost/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                }
            });
            const responseData = await response.json();
            if (response.ok) {
                toast.success('post deleted successfully');
                setdeleteisLoading(false);
            }
            else {
                toast.error(responseData.msg);
                setdeleteisLoading(false);
                throw new Error(responseData.message);

            }
            setdeleteisLoading(false);

        } catch (error) {
            console.log(error);
            setdeleteisLoading(false);

        }

    }

    return { isdeleteLoading, deletePost };
}


export function useUpdate() {

    const [isupdateLoading, setIsUpdateLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const updatePost = async (postId, content) => {
        setIsUpdateLoading(true);

        try {
            const response = await fetch(`${host}/updatepost/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    content

                })
            });

            const responseData = await response.json();
            if (response.ok) {
                setData(responseData.post);
                toast.success('post updated successfully');
                setIsUpdateLoading(false);
            }
            else {
                toast.error(responseData.msg);
                setIsUpdateLoading(false);
                throw new Error(responseData.message);

            }
            setIsUpdateLoading(false);



        } catch (error) {
            console.log(error);
            setIsUpdateLoading(false);

        }
    }

    return { isupdateLoading, error, data, updatePost };
}



export function useSavePost() {


    const savePost = async (postID) => {
        try {

            const response = await fetch(`${host}/savedPost/${postID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            })

            const data = await response.json();
            if (response.ok) {
                toast.success(data.mssg)
            } else {
                toast.error(data.mssg)
            }
        } catch (error) {
            toast.error('Error in saving the posts')
            console.log(error)

        }

    }
    return { savePost };

}