import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-12 h-12 animate-spin">
        <FontAwesomeIcon icon={faSpinner} />
      </div>
    </div>
  );
};

export default Loading;
