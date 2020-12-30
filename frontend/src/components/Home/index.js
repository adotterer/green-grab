import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllOffers } from "../../store/offers";
import "./index.css";

const Offer = ({ theOffer }) => {
  const imageURLs = theOffer.Images.map((image) => {
    return image.URL;
  });

  return (
    <>
      <div>
        <h3>{theOffer.itemName}</h3>
        {imageURLs.map((url) => {
          return <img className="img__thumbnail" src={url} />;
        })}
        <p>
          {!theOffer.price && "FREE"}
          {theOffer.price && `$${theOffer.price}`}
        </p>
        <p>offer from {theOffer.User.username}</p>
        {/* <img src={theBand.coverPhotoUrl} /> */}
      </div>
      <hr />
    </>
  );
};

const HomePage = () => {
  const dispatch = useDispatch();

  const currentOffers = useSelector((state) => {
    return state.offers;
  });

  useEffect(async () => {
    dispatch(fetchAllOffers());
  }, []);

  return (
    <div className="div__container">
      <h2>Check out these offers . . .</h2>
      <br />
      {!currentOffers && <h3>Loading...........</h3>}
      {currentOffers &&
        currentOffers.map((offer) => {
          return <Offer theOffer={offer} />;
        })}
    </div>
  );
};

export default HomePage;
