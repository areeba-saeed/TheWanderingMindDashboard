import React from "react";
import Home from "../pages/home/Home";
import NewBook from "../pages/Books/NewBook";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateBook from "../pages/Books/UpdateBook.jsx";
import Categories from "../pages/Categories/Categories";
import Users from "../pages/Users/Users";
import UpdateUsers from "../pages/Users/UpdateUsers";
import Orders from "../pages/NewOrders/Orders";
import OrderHistory from "../pages/OrderHistory/OrderHistory";
import Books from "../pages/Books/Books";

function Adminroutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="/" element={<Home />} />

            <Route path="categories">
              <Route index element={<Categories />} />
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
              <Route
                path="update/:id"
                element={<UpdateUsers title="Update Users" />}
              />
            </Route>
            <Route path="orders">
              <Route index element={<Orders />} />
            </Route>
            <Route path="ordershistory">
              <Route index element={<OrderHistory />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Adminroutes;
