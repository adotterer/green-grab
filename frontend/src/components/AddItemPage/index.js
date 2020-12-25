import React, { useState } from "react";
import * as itemActions from "../../store/items";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import "./addItemPage.css";

function AddItemPage() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0.0);
  const [itemImage, setItemImage] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  // const [credential, setCredential] = useState("");
  // const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      itemActions.offerItem({
        itemName,
        itemPrice,
        itemImage,
        itemDescription,
      })
    ).catch((res) => {
      if (res.data && res.data.errors) setErrors(res.data.errors);
    });

    // TODO: ADD ERROR HANDLING
  };

  

  return (
    <div className="div__container">
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          <h3>Item Name</h3>
          <div>
            <input
              className="input__box"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
        </label>
        <label>
          <h3>Price</h3>
          <br />
          <div className="div__inline">
            <button
              className="button__inline"
              onClick={(e) => {
                e.preventDefault();
                let newItemPrice = itemPrice > 0 ? itemPrice - 1 : itemPrice;
                setItemPrice(newItemPrice);
              }}
            >
              -
            </button>
            <div className="div__price">
              <input
                className="input__price"
                type="number"
                min="1"
                step="1"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                required
              />
            </div>
            <button
              className="button__inline"
              onClick={(e) => {
                e.preventDefault();
                let newItemPrice =
                  itemPrice < 10000 ? itemPrice + 1 : itemPrice;
                setItemPrice(newItemPrice);
              }}
            >
              +
            </button>
          </div>
        </label>
        <br />
        <div>
          <label>
            <h3>Upload Image</h3>
            <div>
              <input
                type="file"
                value={itemImage}
                onChange={(e) => setItemImage(e.target.value)}
                accept="image/x-png,image/gif,image/jpeg"
                required
              />
            </div>
          </label>
        </div>
        <label>
          <h3>Description</h3>
          <div>
            <textarea
              className="input__box"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              required
            />
          </div>
        </label>
        <div>
          <button className="button__full-length" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddItemPage;
