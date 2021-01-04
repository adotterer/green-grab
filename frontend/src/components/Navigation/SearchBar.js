import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetch } from "../../store/csrf";

function SearchBar() {
  const history = useHistory();
  const [searchLocation, setSearchLocation] = useState();

  const handleSearch = async (e) => {
    e.preventDefault();

    await fetch(`/api/search/location?location=${searchLocation}`)
      .then(({ data }) => {
        console.log("data", data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const loadSearchPage = (e) => {
    setSearchLocation(e.target.value);
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
