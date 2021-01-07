import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetch } from "../../store/csrf";
import { useDispatch } from "react-redux";
import * as searchActions from "../../store/search";

function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchLocation, setSearchLocation] = useState();

  const [errors, setErrors] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("searchLocation", searchLocation);
    dispatch(searchActions.search(searchLocation))
      // .then((res) => {
      //   console.log(res);
      // })
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
    history.push("/search");
    setSearchLocation("");
  };

  const loadSearchPage = (e) => {
    setSearchLocation(e.target.value);
    console.log("searchLocation", searchLocation);
    dispatch(searchActions.search(searchLocation))
      // .then((res) => {
      //   console.log(res);
      // })
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
    history.push("/search");
  };

  return (
    <form onSubmit={handleSearch}>
      <div id="div__search">
        <input class="input__search" type="text" placeholder="Search..." />
        <input
          class="input__location"
          value={searchLocation}
          onChange={loadSearchPage}
          type="text"
          placeholder="Location"
        />
        <button id="button__search-go" type="submit">
          GO
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
