import { useState } from "react";
import { toast } from "react-toastify";
const url = process.env.REACT_APP_BASE_URL;



const host = `${url}/api/v1/auth/userfollowunfollow`
export function useFollowUnfollow() {
    const [isfollowLoading, setisfollowLoading] = useState(false);
    const [error, setError] = useState();


    const followUnfollow = async (UserID) => {
        setisfollowLoading(true);

        try {
            const authToken = localStorage.getItem('auth');
            const response = await fetch(`${host}/${UserID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            const responseData = await response.json();
            if (response.ok) {
                toast.success(responseData.msg)
            }
            else {
                toast.error(responseData.msg);
                throw new Error(responseData.message);
            }
            setisfollowLoading(false);

        } catch (error) {
            toast.error('error following/unfollowing !!');
            console.log(error)
            setError(error.message);
            setisfollowLoading(false);

        }
    }

    return { isfollowLoading, error, followUnfollow };

}