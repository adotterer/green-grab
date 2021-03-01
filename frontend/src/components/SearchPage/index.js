import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../store/search";
import Offer from "../Offer";

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
          if (result.User) {
            return <Offer theOffer={result} />;
          } else {
            return <span>Does not exist</span>;
          }
        })}
    </div>
  );
}

export default SearchPage;
