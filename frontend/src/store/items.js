import { fetch } from "./csrf";

const SET_ITEM = "items/setItem";
const REMOVE_ITEM = "session/removeItem";

const setItem = (item) => {
  // this is a POJO action creator
  return {
    type: SET_ITEM,
    payload: item,
  };
};

const removeItem = () => {
  return {
    type: REMOVE_ITEM,
  };
};

export const offerItem = (item) => async (dispatch) => {
  // this is a thunk
  const { itemName, price, image, description, user } = item;
  const response = await fetch("/api/offer-item", {
    method: "POST",
    body: JSON.stringify({
      message: "HELLO FROM POST REQUEST /api/offer-item",
      itemName,
      price,
      image,
      description,
      user,
      // TODO: PUT WHAT GOES HERE ACTUALLY
    }),
  });
  dispatch(setItem(response.data.item));
  return response;
};

const itemReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ITEM:
      newState = Object.assign({}, state);
      newState.item = action.payload;
      return newState;
    case REMOVE_ITEM:
      newState = Object.assign({}, state);
      newState.item = null;
      return newState;
    default:
      return state;
  }
};

export default itemReducer;
