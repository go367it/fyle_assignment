import React,{useContext, useState} from "react";
import SearchContext from "../context/SearchContext";

const Navbar = () => {
  const {setSearchValue} = useContext(SearchContext)
  const [search, setSearch] = useState('')
  return (
    <div>
      <div className="p-3">
        <div className="flex justify-between w-full">
          <div className="primary flex items-center gap-4 md:gap-6">
            <h2 className="text-xl">GitFetcher</h2>
          </div>

          <div className="md:flex items-center">
            <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setSearchValue(search)}
              className="w-full outline-none border border-1 border-gray-300 rounded-md py-1 px-2 
              focus:ring-2 focus:ring-blue-500 transform duration-300"
              placeholder="Enter to Search"
            />
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
