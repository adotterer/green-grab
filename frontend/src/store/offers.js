import { fetch } from "./csrf.js";

const SET_ALL_OFFERS = "offers/setOffers";

const setOffers = (offers) => {
  return {
    type: SET_ALL_OFFERS,
    offers: offers,
  };
};

export const fetchAllOffers = () => {
  return async (dispatch) => {
    const response = await fetch("/api/offers");
    dispatch(setOffers(response.data.offers));
  };
};

const initialState = [];

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_ALL_OFFERS:
      newState = action.offers;
      return newState;
    default:
      return state;
  }
}

export default reducer;
