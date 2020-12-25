import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import "./LoginForm.css";

function AddItemPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemImage, setItemImage] = useState("");
  // const [credential, setCredential] = useState("");
  // const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    // return dispatch(sessionActions.login({ credential, password })).catch(
    //   (res) => {
    //     if (res.data && res.data.errors) setErrors(res.data.errors);
    //   }
    // );

    // TODO: ADD ERROR HANDLING
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Item Name
        <div>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
      </label>
      <label>
        Price
        <div>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            required
          />
        </div>
      </label>
      <label>
        Upload Image
        <div>
          <input
            type="file"
            value={itemImage}
            onChange={(e) => setItemImage(e.target.value)}
            required
          />
        </div>
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default AddItemPage;