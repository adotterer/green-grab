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
  const { itemName, itemPrice, itemImage, itemDescription, itemImages } = item;

  const formData = new FormData();
  formData.append("itemName", itemName);
  formData.append("itemPrice", itemPrice);
  formData.append("itemDescription", itemDescription);

  // for multiple files
  // if (itemImages && itemImages.length !== 0) {
  //   for (var i = 0; i < itemImages.length; i++) {
  //     formData.append("images", itemImages[i]);
  //   }
  // }

  // for single file
  if (itemImage) formData.append("image", itemImage);

  const res = await fetch(`/api/offer-item/upload`, {
    method: "POST",
    body: formData,
  });

  dispatch(setItem(res.data.user));
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
