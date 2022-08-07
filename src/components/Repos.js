import React from "react";
import {
  BookmarkAltIcon,
  ExternalLinkIcon,
  StarIcon,
} from "@heroicons/react/outline";

const Repos = (props) => {
  return (
    <div className="w-full border border-1 border-gray-300 rounded-md p-4 space-y-3">
      <div className="flex space-x-2 justify-start items-center">
        <BookmarkAltIcon className="w-4 h-4 text-gray-400" />
        <h6 className="text-md text-blue-600 font-semibold">{props.name}</h6>
      </div>
      <div className="flex space-x-2 justify-start items-center">
        <p className="text-xs text-gray-600">{props.description}</p>
      </div>
      <div className="flex space-x-3 justify-start items-center">
        {props.language ? (
          <span className="flex gap-1 items-center">
            {/* <CodeIcon className="w-3 h-3 text-gray-500" /> */}
            <p className="text-xs text-gray-600">{props.language}</p>
          </span>
        ) : (
          ""
        )}
        <a href={props.html_url}>
          <ExternalLinkIcon className="w-3 h-3 text-gray-500 hover:text-blue-600 cursor-pointer" />
        </a>
        <span className="flex gap-1 items-center">
          <StarIcon className="w-3 h-3 text-gray-500 hover:text-blue-600 cursor-pointer" />
          <p className="text-xs text-gray-600">{props.stargazers_count}</p>
        </span>
      </div>
    </div>
  );
};

export default Repos;
