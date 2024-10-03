import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faBars,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [visibleBar, setVisibleBar] = useState(false);

  return (
    <div className="w-full md:h-[140px] ">
      <div className="flex justify-between  items-center text-black ">
        <div className="bg-red-200 md:ml-20">
          <Link to={"/"}>
            <img src="./img/logo.png" alt="" className="size-20" />
          </Link>
        </div>
        <div className=" px-10 py-3  hidden md:flex">
          <Link to={"/"} className="mr-5 text-2xl font-bold">
            Home
          </Link>
          <Link to={"/men"} className="mr-5 text-2xl font-bold">
            Men
          </Link>
          <Link to={"/women"} className="mr-5 text-2xl font-bold">
            Women
          </Link>
          <Link to={"/about"} className="mr-5 text-2xl font-bold">
            About
          </Link>
        </div>
        <div className=" md:mr-20">
          <div className="flex justify-center items-center  px-10 gap-5">
            <Link to={"/login"} className="px-2 py-2  rounded-md">
              <FontAwesomeIcon icon={faUser} className="text-[20px]" />
            </Link>
            <Link to={"/cart"} className="px-2 py-2  rounded-md">
              <FontAwesomeIcon icon={faCartShopping} className="text-[20px]" />
            </Link>
            <div className="px-2 py-2  rounded-md sm:hidden">
              <button onClick={() => setVisibleBar(true)}>
                <FontAwesomeIcon icon={faBars} className="text-[20px]" />
              </button>
            </div>
          </div>
        </div>
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden z-10 bg-white transition-all  ${
            visibleBar ? "w-full " : "w-0 "
          }`}
        >
          <div className=" px-16 py-3  flex flex-col sm:hidden gap-5">
            <button className="flex items-center -ml-10" onClick={() => setVisibleBar(false)}>
              <FontAwesomeIcon icon={faArrowRightToBracket} className="text-[24px]"/>
              {/* <p className="ml-5 font-bold text-2xl ">Back</p> */}
            </button>
            <Link to={"/"} className="pl-10 mr-5 text-2xl font-bold  " onClick={() => setVisibleBar(false)}>
              Home
            </Link>
            <Link to={"/men"} className="pl-10 mr-5 text-2xl font-bold" onClick={() => setVisibleBar(false)}>
              Men
            </Link>
            <Link to={"/women"} className="pl-10 mr-5 text-2xl font-bold" onClick={() => setVisibleBar(false)}>
              Women
            </Link>
            <Link to={"/about"} className="pl-10 mr-5 text-2xl font-bold" onClick={() => setVisibleBar(false)}>
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
