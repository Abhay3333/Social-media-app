import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoutes from "./utils/PrivateRoutes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import ProfilePage from "./pages/ProfilePage";
import PageNotFound from "./pages/PageNotFound";
import CommentsPage from "./pages/CommentPage";


function App() {
  return (
    <Router>
      <ToastContainer />

      <div className="  overflow-hidden">
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/" />
            <Route element={<ProfilePage />} path="/profile/:userID" />
            <Route element={<CommentsPage />} path="/comments/:postID" />

          </Route>
          <Route element={<Login />} path="/login" />
          <Route element={<Signup />} path="/signup" />
          <Route element={<PageNotFound />} path="*" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
