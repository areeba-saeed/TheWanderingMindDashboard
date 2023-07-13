import React from "react";
import Home from "../pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "../pages/Categories/Categories";
import Users from "../pages/Users/Users";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import NewBlog from "../pages/Blogs/NewBlog";
import Blogs from "../pages/Blogs/Blogs";
import UpdateBlog from "../pages/Blogs/UpdateBlog";

function Adminroutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Home />} />

            <Route path="categories">
              <Route index element={<Categories />} />
            </Route>

            <Route path="blogs">
              <Route index element={<Blogs />} />
              <Route path="new" element={<NewBlog title="Add New Blog" />} />
              <Route
                path="update/:id"
                element={<UpdateBlog title="Update Blog" />}
              />
            </Route>
            <Route path="users">
              <Route index element={<Users />} />
            </Route>

            <Route path="contact">
              <Route index element={<Contact />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Adminroutes;
