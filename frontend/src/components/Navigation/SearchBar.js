import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetch } from "../../store/csrf";
import { useDispatch } from "react-redux";
import * as searchActions from "../../store/search";

function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchLocation, setSearchLocation] = useState();
  const [searchTerm, setSearchTerm] = useState();

  const [errors, setErrors] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    e.preventDefault();
    if (!searchTerm) {
      dispatch(searchActions.search(searchLocation)).catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
    } else {
      dispatch(searchActions.searchByTerm(searchTerm, searchLocation)).catch(
        (res) => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        }
      );
    }

    history.push("/search");
    setSearchTerm("");
  };

  const loadSearchPage = (e) => {
    setSearchLocation(e.target.value);

    dispatch(searchActions.search(searchLocation)).catch((res) => {
      if (res.data && res.data.errors) setErrors(res.data.errors);
    });
    history.push("/search");
  };

  return (
    <form onSubmit={handleSearch}>
      <div id="div__search">
        <input
          class="input__search"
          type="text"
          value={searchTerm}
          onChange={(e) => {
            history.push("/search");
            setSearchTerm(e.target.value);
            dispatch(
              searchActions.searchByTerm(searchTerm, searchLocation)
            ).catch((res) => {
              if (res.data && res.data.errors) setErrors(res.data.errors);
            });
          }}
          placeholder="Search..."
        />
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
