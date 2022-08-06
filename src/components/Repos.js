import React from "react";
import { BookmarkAltIcon } from "@heroicons/react/solid";

const Repos = (props) => {
  return (
    <div className="w-full border border-1 border-gray-300 rounded-md p-4">
      <div className="flex space-x-2 justify-start items-center">
        <BookmarkAltIcon className="w-4 h-4 text-gray-400" />
        <h6 className="text-md text-blue-600 font-semibold">{props.name}</h6>
      </div>
    </div>
  );
};

export default Repos;
