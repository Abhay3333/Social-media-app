import React, { useEffect, useState } from "react";
import {
  RiHome2Line,
  RiCompass3Line,
  RiBellLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { useUserInfo } from "../hooks/auth";
import SkeletonSidebar from "./Skeletons/SkeletonSidebar";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Skeletons/sbar.css";

const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo, user } = useUserInfo();
  const [sidebarActive, setSidebarActive] = useState(false);

  useEffect(() => {
    userInfo()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  const handleToggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  if (isLoading) {
    return <SkeletonSidebar />;
  }

  if (!user) {
    return (
      <div className="bg-gray-800 text-white fixed top-0 w-1/6 p-4 h-screen">
        <p>Please log in to view the sidebar.</p>
      </div>
    );
  }

  return (
    <div>
      <br />
      <div className={`sidebar-toggle ${sidebarActive ? 'active' : ''}`}>
        <button id="sidebar-toggle-button" onClick={handleToggleSidebar}>
          &nbsp; &nbsp; &nbsp; &nbsp; <i class="fa-solid fa-bars fa-xl" />
        </button>
      </div>

      <div className={`sidebar closeS text-white fixed top-0 w-1/6 p-4 h-screen border-slate-300 border-2 rounded-lg ${sidebarActive ? 'active' : ''}`} style={{ backgroundColor: '#030303' }}>
        <button className="close-sidebar-button" onClick={handleToggleSidebar}>
          <i class="fa-solid fa-xmark" />
        </button>
        {/* Rest of your sidebar content */}
      </div>


      <div
        className={`sidebar text-white fixed top-0 w-1/6 p-4 h-screen border-slate-300 border-2 rounded-lg ${sidebarActive ? "active" : ""
          }`}
        style={{ backgroundColor: "#030303" }}>
        {/* Rest of your sidebar content */}
        <div className="flex flex-col mt-4 mb-8">

          <p className="font-bold text-4xl">Social Media </p>

          <div className="flex items-center pt-4">
            <NavLink to={`/profile/${user._id}`}>
              <div className="h-14 w-14 rounded-full bg-white mr-3">
                <img
                  src={user.avatar.url}
                  alt={user.username}
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
            </NavLink>
            <p className="text-2xl">Welcome, {user.username}!</p>
          </div>
        </div>
        <ul className="space-y-4 text-xl">
          <li className="flex items-center space-x-3">
            <FaUser className='w-6 h-6 fill-current' />
            <NavLink to={`/profile/${user._id}`}>Profile</NavLink>
          </li>
          <li className="flex items-center space-x-3">
            <RiCompass3Line className="w-6 h-6 fill-current" />
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="flex items-center space-x-3" onClick={handleLogout}>
            <RiLogoutCircleLine className="w-6 h-6 fill-current" />
            <NavLink to="/login">Logout</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

{
  /* <>
<div className={`sidebar-toggle ${sidebarActive ? 'active' : ''}`}>
        <button id="sidebar-toggle-button" onClick={handleToggleSidebar}>
          Toggle Sidebar
        </button>
      </div>

    <div className=" text-white fixed top-0 w-1/6 p-4 h-screen border-slate-300 border-2 rounded-lg " style={{backgroundColor : '#030303'}}>
      <div className="flex items-center mb-8">
      <NavLink to={`/profile/${user._id}`}>
        <div className="h-10 w-10 rounded-full bg-white mr-3">
          <img
            src={user.avatar.url}
            alt={user.username}
            className="h-full w-full object-cover rounded-full"
          />
        </div>
        </NavLink>
        <div>
          <p className="font-bold text-xl">Anonymous Social</p>
          <p className="text-sm">Welcome, {user.username}!</p>
        </div>
      </div>


      <ul className="space-y-4">
        <li className="flex items-center space-x-3">
         <FaUser className='w-6 h-6 fill-current' />
          <NavLink to={`/profile/${user._id}`}>Profile</NavLink>
        </li>
        <li className="flex items-center space-x-3">
          <RiCompass3Line className="w-6 h-6 fill-current" />
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="flex items-center space-x-3" onClick={handleLogout}>
          <RiLogoutCircleLine className="w-6 h-6 fill-current" />
          <NavLink to="/login">Logout</NavLink>
        </li>
      </ul>
    </div>
    </> */
}
