import React, { useState, useEffect } from "react";
import * as itemActions from "../../store/items";
import { useDispatch, useSelector } from "react-redux";
import "./uploadImagePage.css";
// import { Redirect } from "react-router-dom";
import { fetch } from "../../store/csrf";

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const files = event.target.files;
    console.log(files);
  };

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const formData = new FormData();
    formData.append("myFile", files[0]);
    await fetch("/api/offer-item/upload", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.path);
      })
      .catch((error) => {
        console.error(error);
      });

    console.log("formData", formData);
  };

  return (
    <div className="div__container">
      <form onSubmit={handleSubmit} encType="multipart/form-data" method="POST">
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
                onChange={handleImageUpload}
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

export default UploadImagePage;
