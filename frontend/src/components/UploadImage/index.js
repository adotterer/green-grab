import React, { useState, useEffect } from "react";
import * as itemActions from "../../store/items";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import { fetch } from "../../store/csrf";

function UploadImagePage() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [itemImage, setItemImage] = useState("");
  // const [itemDescription, setItemDescription] = useState("");
  // const [credential, setCredential] = useState("");
  // const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // let imgUploadView;

  // useEffect(() => {
  //   console.log(`selectedProduct CHANGED TO`, selectedProduct);
  //   imgUploadView =
  // }, [itemImage]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  // };

  return (
    <div className="div__container">
      <form >
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div>
          <img src={itemImage ? URL.createObjectURL(itemImage) : null} />
          <br />
          <label>
            <h3>Upload Image</h3>
            <div>
              <input
                name="sampleFile"
                type="file"
                onChange={(e) => setItemImage(e.target.files[0])}
                accept="image/x-png,image/gif,image/jpeg"
                required
              />
            </div>
          </label>
        </div>

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
