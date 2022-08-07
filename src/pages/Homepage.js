import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import SearchContext from "../context/SearchContext";
import Repos from "../components/Repos";
import cogoToast from "cogo-toast";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

const Homepage = () => {
  const { searchValue } = useContext(SearchContext);

  const [user, setUser] = useState({}); // state for handling the user details
  const [repos, setRepos] = useState([]); // state for handling the state of repos
  const [loading, setLoading] = useState(true); // state for handling the loading state
  const [page, setPage] = useState(1); // state for handling page number for repo list
  const [pageLimit, setPageLimit] = useState(6); // state for no.of repos per page

  // when the components loads or the searchValue is updated
  useEffect(() => {
    if (searchValue.length > 0) {
      setPage(1)
      setLoading(true);
      cogoToast.loading("Loading ...");
      // config user data without repos
      const config = {
        url: `https://api.github.com/users/${searchValue}`,
        method: "get",
      };
      // config for user repos
      const config1 = {
        url: `https://api.github.com/users/${searchValue}/repos?page=1&per_page=${pageLimit}`,
        method: "get",
      };
      axios(config)
        .then((res) => {
          setUser(res.data);
          // calling for user repos
          axios(config1)
            .then((response) => {
              console.log(response.data);
              if (response.data.length === 0) {
                cogoToast.info("No repos!");
              }
              setRepos(response.data);
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
              cogoToast.error("User not there!");
            });
        })
        .catch((err) => {
          console.log(err.response);
          cogoToast.error("User not there!");
        });
    }
  }, [searchValue]);

  // when page down button is clicked
  const pageDec = () => {
    if (page !== 1) {
      let number = page;
      number--;
      const config1 = {
        url: `https://api.github.com/users/${searchValue}/repos?page=${number}&per_page=${pageLimit}`,
        method: "get",
      };
      // calling for user repos
      axios(config1)
        .then((response) => {
          console.log(response.data);
          if (response.data.length === 0) {
            cogoToast.info("No repos!");
          }
          setRepos(response.data);
          setPage(number);
        })
        .catch((err) => {
          console.log(err);
          cogoToast.error("User not there!");
        });
    } else {
      cogoToast.info("You are at page 1!");
    }
  };

  // when page up button is clicked
  const pageInc = () => {
    cogoToast.loading("Loading repos ...");
    let number = page;
    number++;
    const config1 = {
      url: `https://api.github.com/users/${searchValue}/repos?page=${number}&per_page=${pageLimit}`,
      method: "get",
    };
    // calling for user repos
    axios(config1)
      .then((response) => {
        console.log(response.data);
        if (response.data.length !== 0) {
          setRepos(response.data);
          setPage(number);
        } else {
          cogoToast.info("No repos!");
        }
      })
      .catch((err) => {
        console.log(err);
        cogoToast.error("User not there!");
      });
  };

  return (
    <div className="p-4 xl:px-80">
      {loading ? (
        <div className="w-full p-4 bg-blue-50 border text-blue-600 rounded-md"> Type to search in the Search Field</div>
      ) : (
        <>
          {/* for showing details of user  */}
          <div className="sm:flex space-x-10 py-6">
            <img
              alt=""
              className="h-72 w-72 ring-2 ring-offset-1 ring-gray-300 rounded-full"
              src={user.avatar_url}
            />
            <div className="space-y-1">
              <p className="text-3xl font-semibold">{user.name}</p>
              <p className="text-md text-gray-600">{user.bio}</p>
              <p className="text-sm text-gray-600">
                Repos: {user.public_repos}
              </p>
              <p className="text-sm text-gray-600">
                Followers: {user.followers}
              </p>
              <p className="text-sm text-gray-600">
                Following: {user.following}
              </p>
            </div>
          </div>
          {/* for showing repos inside the github user  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {repos.length > 0
              ? repos.map((j) => {
                  return (
                    <Repos
                      key={j.id}
                      name={j.name}
                      language={j.language}
                      description={j.description}
                      html_url={j.html_url}
                      stargazers_count={j.stargazers_count}
                      visibility={j.visibility}
                    />
                  );
                })
              : ""}
          </div>
          {/* for pagination */}
          <div className="flex justify-center items-center w-full mt-6">
            <span className="flex items-center justify-around divide-x-2 border rounded-md">
              <button className="w-full p-2" onClick={() => pageDec()}>
                <ChevronLeftIcon className="w-5 h-5 text-center text-gray-400  hover:text-blue-500" />
              </button>
              <div className="text-center text-gray-600 w-full py-2 px-4">
                {page}
              </div>
              <button
                className="w-full p-2 flex justify-end"
                onClick={() => pageInc()}
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-400  hover:text-blue-500" />
              </button>
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Homepage;
