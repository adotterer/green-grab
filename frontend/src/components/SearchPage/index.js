import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../store/search";

function SearchPage() {
  const sessionSearch = useSelector((state) => {
    console.log("STATE", state.nearbyItems);
    return state.nearbyItems.nearbyItems;
  });
  const [searchResults, setSearchResults] = useState();

  useEffect(async () => {
    if (sessionSearch) {
      setSearchResults(sessionSearch);
    }
  }, [sessionSearch]);

  return (
    <div className="div__container">
      {!searchResults && <h1>Loading.....</h1>}
      {searchResults &&
        searchResults.map((result) => {
          return <h1>City: {result.city}</h1>;
        })}
    </div>
  );
}

export default SearchPage;
