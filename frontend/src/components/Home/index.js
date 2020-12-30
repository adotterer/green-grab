import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllOffers } from "../../store/offers";
import "./index.css";

const Offer = ({ theOffer }) => {
  console.log("THE OFFER", theOffer);

  // const images = theOffer.Images.map((image) => {
  //   return <img src={image.props.src} />;
  // });

  const imageURLs = theOffer.Images.map((image) => {
    return image.URL;
  });

  const testarr = imageURLs.map((url) => {
    return url;
  });

  console.log("testarr", testarr);

  return (
    <>
      <div>
        <h3>{theOffer.itemName}</h3>
        {testarr.map((url) => {
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
    <div id="offers-page">
      <h2>Check out these offers . . .</h2>
      {!currentOffers && <h3>Loading...........</h3>}
      {currentOffers &&
        currentOffers.map((offer) => {
          return <Offer theOffer={offer} />;
        })}
    </div>
  );
};

export default HomePage;
