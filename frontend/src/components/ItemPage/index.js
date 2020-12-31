import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOffers } from "../../store/offers";

function ItemPage() {
  const dispatch = useDispatch();
  const { itemId } = useParams();

  useEffect(async () => {
    dispatch(fetchAllOffers());
  }, []);

  let currentOffer = useSelector((state) => {
    return state.offers;
  });

  console.log(currentOffer);

  return (
    <div className="div__container">
      <p>joiajdf</p>
      <h1>{itemId}</h1>
    </div>
  );
}

export default ItemPage;
