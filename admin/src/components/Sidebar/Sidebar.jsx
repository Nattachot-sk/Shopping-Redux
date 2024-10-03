import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faCartShopping,
  faChartLine,
  faClapperboard,
  faClipboard,
  faPenToSquare,
  faRightFromBracket,
  faUser,
  faArrowRightToBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [toggleBar, setToggleBar] = useState(false);

  return (
    <div className="md:w-[300px] md:h-screen h-auto w-auto  shadow-lg block  md:fixed left-0 top-0 bottom-0">
      <div className="md:flex md:flex-col md:items-center md:justify-evenly ">
        <div className="px-2 py-2  rounded-md sm:hidden ">
          <button onClick={() => setToggleBar(true)}>
            <FontAwesomeIcon icon={faBars} className="text-[20px]" />
          </button>
        </div>
        <div className="">
          <img
            src="../../img/logo.png"
            alt=""
            className={`md:size-40 hidden md:block`}
          />
        </div>
        <div className="border-2 border-blue-400 bg-blue-300 text-white font-bold pl-2 w-full">
          <h1 className="text-left">Menu</h1>
        </div>
        <div className="2xl:flex  w-full  hidden gap-5 mb-5 ">
          <ul className="w-full  flex flex-col items-start ">
            <li className="w-full py-3  hover:bg-gray-100 px-20 ">
              <NavLink
                to={"/admin"}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending w-full "
                    : isActive
                    ? "text-blue-600 font-bold"
                    : ""
                }
              >
                <button className="w-full text-left hover:underline">
                  <FontAwesomeIcon icon={faChartLine} className="pr-5" />
                  Dashboard
                </button>
              </NavLink>
            </li>
            <li className="w-full py-3  hover:bg-gray-100 px-20">
              <NavLink
                to={"/member"}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending w-full"
                    : isActive
                    ? "text-blue-600 font-bold w-full"
                    : ""
                }
              >
                <button className="w-full text-left hover:underline">
                  <FontAwesomeIcon icon={faUser} className="pr-5" />
                  Member
                </button>
              </NavLink>
            </li>
            <li className="w-full py-3  hover:bg-gray-100 px-20">
              <NavLink
                to={"/product"}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending w-full"
                    : isActive
                    ? "text-blue-600 font-bold w-full"
                    : ""
                }
              >
                <button className="w-full text-left hover:underline">
                  <FontAwesomeIcon icon={faClipboard} className="pr-5" />
                  Product
                </button>
              </NavLink>
            </li>
            <li className="w-full py-3  hover:bg-gray-100 px-20">
              <NavLink
                to={"/cart"}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending w-full"
                    : isActive
                    ? "text-blue-600 font-bold w-full"
                    : ""
                }
              >
                <button className="w-full text-left hover:underline">
                  <FontAwesomeIcon icon={faCartShopping} className="pr-5" />
                  Cart
                </button>
              </NavLink>
            </li>
            <li className="w-full py-3  hover:bg-gray-100 px-20">
              <NavLink
                to={"/order"}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending w-full"
                    : isActive
                    ? "text-blue-600 font-bold w-full"
                    : ""
                }
              >
                <button className="w-full text-left hover:underline">
                  <FontAwesomeIcon icon={faBoxOpen} className="pr-5" />
                  Order
                </button>
              </NavLink>
            </li>
          </ul>
        </div>

        <div
          className={`absolute top-0 left-0 bottom-0 overflow-hidden z-10 bg-white transition-all shadow-2xl ${
            toggleBar
              ? "w-[80%] fixed top-0 left-0 bottom-0  min-h-screen"
              : "w-0 fixed"
          }`}
        >
          <div className=" px-16 py-3  flex flex-col sm:hidden gap-5">
            <button
              className="flex items-center -ml-10"
              onClick={() => setToggleBar(false)}
            >
              <FontAwesomeIcon
                icon={faArrowRightToBracket}
                className="text-[24px]"
              />
              {/* <p className="ml-5 font-bold text-2xl ">Back</p> */}
            </button>
          </div>
          <div className="border-2 border-blue-400 bg-blue-300 text-white font-bold pl-2 w-full">
            <h1 className="text-center">Menu</h1>
          </div>
          <div className="flex  w-full bg  gap-5 mb-5 ">
            <ul className="w-full  flex flex-col items-start ">
              <li className="w-full py-3  hover:bg-gray-100 px-20 ">
                <NavLink
                  to={"/admin"}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending w-full "
                      : isActive
                      ? "text-blue-600 font-bold"
                      : ""
                  }
                >
                  <button className="w-full text-left hover:underline">
                    <FontAwesomeIcon icon={faChartLine} className="pr-5" />
                    Dashboard
                  </button>
                </NavLink>
              </li>
              <li className="w-full py-3  hover:bg-gray-100 px-20">
                <NavLink
                  to={"/member"}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending w-full"
                      : isActive
                      ? "text-blue-600 font-bold w-full"
                      : ""
                  }
                >
                  <button className="w-full text-left hover:underline">
                    <FontAwesomeIcon icon={faUser} className="pr-5" />
                    Member
                  </button>
                </NavLink>
              </li>
              <li className="w-full py-3  hover:bg-gray-100 px-20">
                <NavLink
                  to={"/product"}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending w-full"
                      : isActive
                      ? "text-blue-600 font-bold w-full"
                      : ""
                  }
                >
                  <button className="w-full text-left hover:underline">
                    <FontAwesomeIcon icon={faClipboard} className="pr-5" />
                    Product
                  </button>
                </NavLink>
              </li>
              <li className="w-full py-3  hover:bg-gray-100 px-20">
                <NavLink
                  to={"/cart"}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending w-full"
                      : isActive
                      ? "text-blue-600 font-bold w-full"
                      : ""
                  }
                >
                  <button className="w-full text-left hover:underline">
                    <FontAwesomeIcon icon={faCartShopping} className="pr-5" />
                    Cart
                  </button>
                </NavLink>
              </li>
              <li className="w-full py-3  hover:bg-gray-100 px-20">
                <NavLink
                  to={"/order"}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending w-full"
                      : isActive
                      ? "text-blue-600 font-bold w-full"
                      : ""
                  }
                >
                  <button className="w-full text-left hover:underline">
                    <FontAwesomeIcon icon={faBoxOpen} className="pr-5" />
                    Order
                  </button>
                </NavLink>
              </li>
              <div className="absolute bottom-10 w-full">
                <button className="w-full flex justify-center items-center gap-4 py-3 bg-red-500 text-white font-bold hover:text-black hover:bg-red-400 transition-all">
                  <FontAwesomeIcon icon={faRightFromBracket} className="" />
                  Logout
                </button>
              </div>
            </ul>
          </div>
        </div>
        <div className="md:absolute bottom-10 w-full md:block hidden">
          <button className="w-full flex justify-center items-center gap-4 py-3 bg-red-500 text-white font-bold hover:text-black hover:bg-red-400 transition-all">
            <FontAwesomeIcon icon={faRightFromBracket} className="" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
