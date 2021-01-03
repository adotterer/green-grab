import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetch } from "../../store/csrf";
import { fetchSingleOffer } from "../../store/offers";
// import "./itemPage.css";

function EditItemPage() {
  const dispatch = useDispatch();
  const { userId, itemId } = useParams();
  const [itemName, setItemName] = useState();
  const [itemPrice, setItemPrice] = useState();
  const [itemDescription, setItemDescription] = useState();
  const sessionUser = useSelector((state) => state.session.user);

  const currentOffer = useSelector((state) => {
    return state.offers.offer;
  });

  useEffect(async () => {
    await dispatch(fetchSingleOffer(itemId));
  }, []);

  useEffect(async () => {
    if (currentOffer) {
      setItemName(currentOffer.itemName);
      setItemPrice(currentOffer.price || 0);
      setItemDescription(currentOffer.description);
    }
  }, [currentOffer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/offers/edit", {
      method: "PUT",
      body: JSON.stringify({
        itemName,
        itemPrice,
        itemDescription,
        itemId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="div__container">
      {sessionUser.id === userId && <h1>The ids match, you can edit!</h1>}
      {!currentOffer && <span>Loading........</span>}
      {currentOffer && (
        <div>
          <form onSubmit={handleSubmit}>
            <img id="img__primary" src={currentOffer.Images[0].URL} />
            {/* <h1>{currentOffer.itemName}</h1> */}
            <div>
              Name:
              <input
                type="text"
                value={itemName}
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
              />
              <br />
              Price:
              <input
                type="float"
                value={itemPrice}
                onChange={(e) => {
                  setItemPrice(e.target.value);
                }}
              />
            </div>
            {/* <p className="p__offer-from">
              offer from
              <NavLink class="a__username" exact to={`/profile/${userId}`}>
                {" " + currentOffer.User.username}
              </NavLink>
            </p>
            <div className="div__location">{currentOffer.location}</div> */}
            <div>
              <br />
              Description:
              <textarea
                className="input__box"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                required
              />
            </div>
            <button className="button__full-length" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditItemPage;
