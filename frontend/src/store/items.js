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
  const { itemName, itemPrice, itemImage, itemDescription } = item;
  const response = await fetch("/api/offer-item", {
    method: "POST",
    body: JSON.stringify({
      itemName,
      itemPrice,
      // image,
      itemDescription,
      // user,
      // TODO: PUT WHAT GOES HERE ACTUALLY
    }),
  });
  dispatch(setItem(response.data.item));
  return response;
};

const initialState = {};

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
