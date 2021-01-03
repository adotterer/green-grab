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
  const sessionUser = useSelector((state) => state.session.user);

  const currentOffer = useSelector((state) => {
    console.log("offers bitch", state.offers);
    // setItemName(state.offers.offer.itemName);
    return state.offers.offer;
  });

  useEffect(async () => {
    await dispatch(fetchSingleOffer(itemId));
  }, []);

  useEffect(async () => {
    if (currentOffer) {
      setItemName(currentOffer.itemName);
    }
  }, [currentOffer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/offers/edit", {
      method: "PUT",
      body: JSON.stringify({
        itemName,
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
            <h1>{currentOffer.itemName}</h1>
            <input
              type="text"
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
            <h3>
              {!currentOffer.price && "FREE"}
              {currentOffer.price}
            </h3>
            <p className="p__offer-from">
              offer from
              <NavLink class="a__username" exact to={`/profile/${userId}`}>
                {" " + currentOffer.User.username}
              </NavLink>
            </p>
            <div className="div__location">{currentOffer.location}</div>
            <div>
              <br />
              <p>{currentOffer.description}</p>
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
