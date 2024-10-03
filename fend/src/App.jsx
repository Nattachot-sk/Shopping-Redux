import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Topbar from "./components/Navbar/Topbar";
import About from "./pages/About/About";
import Cart from "./pages/Cart/Cart";
import Menproduct from "./pages/Product/Men/Menproduct";
import Womenproduct from "./pages/Product/Women/Womenproduct";

function App() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/men" element={<Menproduct />} />
        <Route path="/women" element={<Womenproduct />} />
      </Routes>
    </>
  );
}

export default App;
