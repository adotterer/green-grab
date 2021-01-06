import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOffers } from "../../store/offers";
import Offer from "../Offer";

import "./index.css";

const HomePage = () => {
  const dispatch = useDispatch();

  const currentOffers = useSelector((state) => {
    if (Array.isArray(state.offers.offers)) {
      const reversedOffers = state.offers.offers.reverse();
      console.log(reversedOffers, "reveresed Offers");
      return reversedOffers;
    }
  });

  useEffect(async () => {
    dispatch(fetchAllOffers());
  }, []);

  return (
    <div className="div__container" id="item-board">
      {!currentOffers && <h3>Loading...........</h3>}
      {currentOffers &&
        currentOffers.map((offer) => {
          return <Offer theOffer={offer} />;
        })}
    </div>
  );
};

export default HomePage;
