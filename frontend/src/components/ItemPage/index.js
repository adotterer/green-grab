import React, { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleOffer } from "../../store/offers";
import "./itemPage.css";

function ItemPage() {
  const dispatch = useDispatch();
  const { userId, itemId } = useParams();

  const sessionUser = useSelector((state) => state.session.user);
  const currentOffer = useSelector((state) => {
    return state.offers.offer;
  });

  useEffect(async () => {
    dispatch(fetchSingleOffer(itemId));
  }, []);

  console.log("ids", sessionUser.id, userId);
  return (
    <div className="div__container">
      {!currentOffer && <span>Loading........</span>}
      {currentOffer && (
        <div>
          <img id="img__primary" src={currentOffer.Images[0].URL} />
          <h1>{currentOffer.itemName}</h1>
          <h3>
            {!currentOffer.price && "FREE"}
            {currentOffer.price}
          </h3>
          <p className="p__offer-from">
            offer from
            <NavLink className="a__username" exact to={`/profile/${userId}`}>
              {" " + currentOffer.User.username}
            </NavLink>
          </p>
          <div className="div__location">{currentOffer.location}</div>
          <div>
            <br />
            <p>{currentOffer.description}</p>
          </div>
          {Number(sessionUser.id) === Number(userId) && (
            <NavLink exact to={`/items/edit/${userId}/${itemId}`}>
              <div>Edit item here</div>
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
}

export default ItemPage;
