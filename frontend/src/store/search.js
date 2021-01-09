import { fetch } from "./csrf";

const SET_SEARCH = "search/setSearch";

const setSearch = (results) => {
  return {
    type: SET_SEARCH,
    payload: results,
  };
};

export const searchByTerm = (searchTerm, searchLocation) => async (
  dispatch
) => {
  console.log("hello from search thunk, this is line 14");
  const response = await fetch(
    `/api/search?term=${searchTerm}&location=${searchLocation}`
  );
  dispatch(setSearch(response.data.queryResults));
  return response;
};

export const search = (searchLocation) => async (dispatch) => {
  const response = await fetch(
    `/api/search/location?location=${searchLocation}`
  );

  console.log("hello from search thunk", response.data);
  dispatch(setSearch(response.data.nearbyItems));
  return response;
};

const initialState = { nearbyItems: null };

const searchReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_SEARCH:
      newState = Object.assign({}, state);

      newState.nearbyItems = action.payload;
      return newState;
    default:
      return state;
  }
};

export default searchReducer;
