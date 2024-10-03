import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-[35px] text-red-500">NOT FOUND</h1>
      <Link to={"/"} className="text-blue-500 hover:underline">Back to home</Link>
    </div>
  );
};

export default Notfound;
