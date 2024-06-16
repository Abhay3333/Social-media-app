import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useLogin();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.username, formData.password).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-md w-full p-10 bg-white rounded-3xl shadow-2xl">
        <h2 className="text-5xl font-black text-center mb-10 text-gray-800">
          Welcome to Anonymous Social Posting!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label
              htmlFor="username"
              className="block text-gray-700 font-extrabold mb-3"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter a unique username"
              className="w-full px-5 py-4 rounded-lg bg-gray-100 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              onChange={onChange}
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-gray-700 font-extrabold mb-3"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-5 py-4 rounded-lg bg-gray-100 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                onChange={onChange}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-8 py-5 bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-extrabold rounded-lg hover:bg-gradient-to-r hover:from-indigo-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Login
            </button>
             </div>
        </form>
        <div className="mt-10 text-center text-gray-600">
          <span className="font-extrabold">Don't have an account?</span>
          <Link
            to="/signup"
            className="text-indigo-600 hover:underline font-black ml-2"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;