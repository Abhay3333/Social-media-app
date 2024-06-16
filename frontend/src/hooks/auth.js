
import { useState } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';
import { faL } from "@fortawesome/free-solid-svg-icons";

const url = process.env.REACT_APP_BASE_URL;

const host = `${url}/api/v1/auth`


export function useLogin() {


    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();



    const login = async (username, password) => {
        setisLoading(true);
        setError(null);
        try {
            const response = await fetch(`${host}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                }),
            });
            const responseData = await response.json();
            if (response.ok) {
                toast.success('user logged in succesfully')
                localStorage.setItem('auth', responseData.token)
                navigate('/');


            }
            else {
                toast.error(responseData.msg);
                throw new Error(responseData.message);
            }
            setIsLogged(true);
            setisLoading(false);
        } catch (err) {
            toast.error('error logging in!!');
            console.log(err)
            setError(err.message);
            setisLoading(false);
        }
    }

    return { isLoading, error, isLogged, login };



}


export function useSignup() {

    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSignedUp, setIsSignedUp] = useState(false);

    const signup = async (username, password, email) => {
        setisLoading(true);
        setError(null);
        try {
            const response = await fetch(`${host}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
            });
            const responseData = await response.json();
            if (response.ok) {
                toast.success('user signed up succesfully')

            }
            else {
                toast.error(responseData.error);
                throw new Error(responseData.error);
            }
            setIsSignedUp(true);
            setisLoading(false);
        } catch (err) {
            toast.error('error signing up!!');
            setError(err.message);
            setisLoading(false);
        }
    }

    return { isLoading, error, isSignedUp, signup };

}


export function useUserInfo() {
    const [user, setUser] = useState();
    const [isLoggedin, setisLoggedin] = useState(false);

    const userInfo = async (req, res) => {
        try {
            const authToken = localStorage.getItem('auth');

            const response = await fetch(`${host}/userinfo`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },

            })
            const responseData = await response.json();
            if (response.ok) {

                setUser(responseData.user)
                setisLoggedin(true)
            }
            else {
                setisLoggedin(false);
                throw new Error(responseData.error)

            }

        } catch (error) {
            console.log(error)
        }


    }


    return { userInfo, user, isLoggedin }
}


export function useUpdateProfile() {
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [error, setError] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);

    const updateProfile = async (bio, username) => {
        setIsUpdatingProfile(true);
        setError(null);
        const authToken = localStorage.getItem('auth');
        try {
            const response = await fetch('https://anonymous-social-bt77.onrender.com/api/v1/auth/editprofile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    bio,
                    username
                })
            })
            const responseData = await response.json();
            if (response.ok) {
                toast.success('profile updated succesfully')
                setIsUpdated(true);
            }
            else {
                toast.error(responseData.error);
                throw new Error(responseData.error);
            }
            setIsUpdatingProfile(false);

        } catch (error) {
            toast.error('error updating profile!!');
            setError(error.message);
            setIsUpdatingProfile(false);

        }

    }

    return { isUpdatingProfile, error, isUpdated, updateProfile }
}

