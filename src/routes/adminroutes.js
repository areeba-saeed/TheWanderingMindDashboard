import React from "react";
import Home from "../pages/home/Home";
import NewBook from "../pages/Books/NewBook";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateBook from "../pages/Books/UpdateBook.jsx";
import Categories from "../pages/Categories/Categories";
import Users from "../pages/Users/Users";
import Orders from "../pages/NewOrders/Orders";
import Books from "../pages/Books/Books";
import Authors from "../pages/Authors/Authors";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";

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
            <Route path="authors">
              <Route index element={<Authors />} />
            </Route>

            <Route path="books">
              <Route index element={<Books />} />
              <Route path="new" element={<NewBook title="Add New Book" />} />
              <Route
                path="update/:id"
                element={<UpdateBook title="Update Books" />}
              />
            </Route>
            <Route path="users">
              <Route index element={<Users />} />
            </Route>
            <Route path="orders">
              <Route index element={<Orders />} />
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
