import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Admin from "./pages/Admin/Admin";
import Member from "./pages/Member/Member";
import Product from "./pages/Product/Product";
import Order from "./pages/Order/Order";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import Notfound from "./pages/Notfound/Notfound";

function App() {
  const location = useLocation(); // Get the current route

  // Check if the path is login (/) or not found (*) by comparing current location
  const isLoginPage = location.pathname === "/";
  const isNotFoundPage =
    location.pathname !== "/" &&
    !["/admin", "/member", "/product", "/order", "/cart", "/contact"].includes(
      location.pathname
    );

  return (
    <div>
      {/* Conditionally render Sidebar if not on login or not found pages */}
      {!isLoginPage && !isNotFoundPage && <Sidebar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/member" element={<Member />} />
        <Route path="/product" element={<Product />} />
        <Route path="/order" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
