import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useUserInfo } from '../hooks/auth';
import PageSkeleton from '../components/Skeletons/PageSekeleton';


const PrivateRoutes = () => {
    const { user, isLoggedin, userInfo } = useUserInfo();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            await userInfo();
            setLoading(false);
        };

        fetchUserInfo();
    }, []);

    if (isLoading) {

        return <div>
            <PageSkeleton />
        </div>;
    }

    return (
        <>
            {isLoggedin ? <Outlet /> : <Navigate to="/login" />}
        </>
    );
};

export default PrivateRoutes;
