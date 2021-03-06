import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOffers } from "../../store/offers";
import Offer from "../Offer";

import "./index.css";

const HomePage = () => {
  const dispatch = useDispatch();

  const currentOffers = useSelector((state) => {
    return state.offers.offers;
  });

  useEffect(async () => {
    dispatch(fetchAllOffers());
  }, []);

  return (
    <div className="div__container item-board">
      {!currentOffers && <h3>Loading...........</h3>}
      {currentOffers &&
        currentOffers.map((offer) => {
          return <Offer theOffer={offer} />;
        })}
    </div>
  );
};

export default HomePage;
