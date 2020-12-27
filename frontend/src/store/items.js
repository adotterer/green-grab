import { fetch } from "./csrf";

const SET_ITEM = "items/setItem";
const REMOVE_ITEM = "session/removeItem";
const UPLOAD_IMAGE = "offer-item/upload";

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

const uploadImage = () => {
  return {
    type: UPLOAD_IMAGE,
  };
};

export const offerItem = (item) => async (dispatch) => {
  // this is a thunk
  const { itemName, itemPrice, itemImage, itemDescription } = item;
  const response = await fetch("/api/offer-item", {
    method: "POST",
    body: JSON.stringify({ item }),

    // JSON.stringify({
    // itemName,
    // itemPrice,
    // itemImage,
    // itemDescription,

    // }),
    // user,
    // TODO: PUT WHAT GOES HERE ACTUALLY
  });
  dispatch(setItem(response.data.item));
  return response;
};

export const addImageUpload = (files) => async (dispatch) => {
  // this is a thunk
  const response = await fetch("/api/offer-item/upload", {
    method: "POST",
    // headers: { "Content-Type": "multipart/form-data" },
    body: JSON.stringify({ files }),
  });
  dispatch(uploadImage(response.data.image));
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
