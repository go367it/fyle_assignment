import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import SearchContext from "../context/SearchContext";
import Repos from "../components/Repos";

const Homepage = () => {

  const { searchValue } = useContext(SearchContext);

  const [repos, setRepos] = useState([])

  useEffect(() => {
    if (searchValue.length > 0) {
      const config = {
        url: `https://api.github.com/users/${searchValue}/repos`,
        method: "get",
      };
      axios(config)
        .then((res) => {
          console.log(res.data);
          setRepos(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchValue]);
  return (
    <div className="p-4 md:px-80">
      <div className="grid grid-cols-2 gap-4">
        {repos.length > 0 ? 
        repos.map(j=>{
          return(<Repos key={j.id} name={j.name} />)
        })
        :''}
      </div>
    </div>
  );
};

export default Homepage;
