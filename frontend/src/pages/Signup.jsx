import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", cpassword: "", password: "", email: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useSignup();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validation = () => {
    if (formData.password !== formData.cpassword) {
      toast.error("Password and Confirm Password do not match");
      return false;
    }
    return true;
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      signup(formData.username, formData.password, formData.email);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900">
      <ToastContainer />
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Choose a unique username"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              onChange={onChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Choose a unique email"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              onChange={onChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Choose a secure password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              onChange={onChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="cpassword" className="block text-gray-700 font-bold mb-2">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="cpassword"
              name="cpassword"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              onChange={onChange}
            />
          </div>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="viewpassword"
                  aria-describedby="viewpassword"
                  onClick={handleShowPassword}
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="viewpassword" className="text-gray-900 dark:text-gray-900">
                  View password
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold rounded-lg hover:bg-gradient-to-r hover:from-indigo-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-6 text-center text-gray-600">
          <span className="font-semibold">Already have an account?</span>
          <Link to="/login" className="text-indigo-600 hover:underline font-bold ml-2">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;