import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleOffer } from "../../store/offers";
import "./itemPage.css";

function ItemPage() {
  const dispatch = useDispatch();
  const { itemId } = useParams();

  const currentOffer = useSelector((state) => {
    return state.offers.offer;
  });

  useEffect(async () => {
    dispatch(fetchSingleOffer(itemId));
  }, []);

  const images = currentOffer.Images;

  // const imageURLs = currentOffer.Images.map((image) => {
  //   return image.URL;
  // });

  console.log("images", images);

  // console.log("currentOffer Images", imageURLs);

  return (
    <div className="div__container">
      {!currentOffer && <span>Loading........</span>}
      {currentOffer && (
        <div>
          <h1>{currentOffer.itemName}</h1>
          {console.log("fuck this shit", currentOffer.Images)}

          <div className="div__location">{currentOffer.location}</div>
        </div>
      )}
    </div>
  );
}

export default ItemPage;
