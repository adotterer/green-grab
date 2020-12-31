import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOffers } from "../../store/offers";

import "./index.css";

const Offer = ({ theOffer }) => {
  const imageURLs = theOffer.Images.map((image) => {
    return image.URL;
  });

  return (
    <div>
      <NavLink exact to={`/items/${theOffer.User.id}/${theOffer.id}`}>
        <div className="div__offer-container">
          {imageURLs.map((url) => {
            return <img className="img__thumbnail" src={url} />;
          })}
          <div className="div__offer-info">
            <h3>{theOffer.itemName}</h3>

            <p className="p__price">
              {!theOffer.price && "FREE"}
              {theOffer.price && `$${theOffer.price}`}
            </p>
            {/* <p className="p__offer-from">offer from {theOffer.User.username}</p> */}
            <p className="p__location">{theOffer.location}</p>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

const HomePage = () => {
  const dispatch = useDispatch();

  const currentOffers = useSelector((state) => {
    return state.offers.offers;
  });

  useEffect(async () => {
    dispatch(fetchAllOffers());
  }, []);

  return (
    <div className="div__container" id="item-board">
      {!currentOffers && <h3>Loading...........</h3>}
      {currentOffers && console.log("currentOffers", currentOffers)}
      {currentOffers &&
        currentOffers.map((offer) => {
          return <Offer theOffer={offer} />;
        })}
    </div>
  );
};

export default HomePage;
