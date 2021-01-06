import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../store/search";

function SearchPage() {
  const sessionSearch = useSelector((state) => {
    console.log("STATE", state.nearbyItems);
    return state.nearbyItems.nearbyItems;
  });
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState();

  // const sessionSearch = useSelector((state) => {
  //   // setSearchResults(state.session.nearbyItems);
  //   return state.session.nearbyItems;
  // });

  // useEffect(async () => {
  //   if (sessionSearch) {
  //     // console.log("sessionSearch", sessionSearch[0].city);
  //     setSearchResults(sessionSearch);
  //   }
  // });

  return (
    <div className="div__container">
      {/* {sessionSearch && <h2>{sessionSearch[0].city}</h2>} */}
      {sessionSearch &&
        sessionSearch.map((result) => {
          return <h1>City: {result.city}</h1>;
        })}
    </div>
  );
}

export default SearchPage;
