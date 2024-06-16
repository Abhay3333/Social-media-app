
import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const url = process.env.REACT_APP_BASE_URL;



const host = `${url}/api/v1/likes/likeDislikePost`;

export function useLikeDislike() {

    const LikePost = async (postId) => {

        const authToken = localStorage.getItem('auth');
        try {
            const response = await fetch(`${host}/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }

            })

            const responseData = await response.json();
            if (response.ok) {
                console.log(responseData)

            }
            else {

                throw new Error(responseData.message);
            }

        } catch (error) {
            console.log(error);
            toast.error('error liking post');

        }

    }

    return { LikePost };


}