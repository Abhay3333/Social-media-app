
import { useState } from 'react';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const url = process.env.REACT_APP_BASE_URL;


const host = `${url}/api/v1/comments`


export function useAddComments() {
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const addComment = async (content, postId) => {
        setisLoading(true);
        setError(null);
        try {
            const authToken = localStorage.getItem('auth');
            const response = fetch(`${host}/addcomment/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    comment: content
                }),
            });

            const responseData = await response.json();
            if (response.ok) {
                setData(responseData.posts);
                toast('Comment added succesfully!!')
            }
            else {
                toast.error('error in adding the comment');
                throw new Error(responseData.message);

            }
            setisLoading(false);

        }
        catch (err) {
            setError(err.message);
            setisLoading(false);
        }
    };

    return { isLoading, error, data, addComment };

}


export function useDeleteComment() {

    const [isdeleteLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const deleteComment = async (commentId) => {

        const authToken = localStorage.getItem('auth');
        setisLoading(true);
        setError(null);
        try {
            const respose = await fetch(`${host}/deletecomment/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            const responseData = await respose.json();
            if (respose.ok) {
                setData(responseData.posts);
                toast('Comment deleted succesfully!!')
            }
            else {
                toast.error('error in deleting the comment');
                throw new Error(responseData.message);

            }
            setisLoading(false);

        }
        catch (err) {
            setError(err.message);
            setisLoading(false);
        }

    }

    return { isdeleteLoading, error, data, deleteComment };
}
