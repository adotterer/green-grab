import { fetch } from "./csrf.js";

const SET_ALL_OFFERS = "offers/setOffers";
const SET_SINGLE_OFFER = "offers/setOffer";

const setOffers = (offers) => {
  return {
    type: SET_ALL_OFFERS,
    offers: offers,
  };
};

const setSingleOffer = (offer) => {
  return {
    type: SET_SINGLE_OFFER,
    offer: offer,
  };
};

export const fetchAllOffers = () => {
  return async (dispatch) => {
    const response = await fetch("/api/offers");
    dispatch(setOffers(response.data.offers));
  };
};

export const fetchSingleOffer = (id) => {
  return async (dispatch) => {
    const response = await fetch(`/api/offers/single?id=${id}`);
    dispatch(setSingleOffer(response.data.offer));
  };
};

const initialState = [];

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_ALL_OFFERS:
      newState = action.offers;
      return newState;
    case SET_SINGLE_OFFER:
      newState = action.offer;
      return newState;
    default:
      return state;
  }
}

export default reducer;
