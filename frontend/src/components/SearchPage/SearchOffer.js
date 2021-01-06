import React from "react";
import { NavLink } from "react-router-dom";

const SearchOffer = ({ theOffer }) => {
  const imageURLs = theOffer.Images.map((image) => {
    return image.URL;
  });

  return (
    <div>
      <NavLink exact to={`/items/${theOffer.User.id}/${theOffer.id}`}>
        <div className="div__offer-container">
          <img className="img__thumbnail" src={imageURLs[0]} />
          {/* add for future multiple images */}
          {/* {imageURLs.map((url) => {
            return <img className="img__thumbnail" src={url} />;
          })} */}
          <div className="div__offer-info">
            <h3>{theOffer.itemName}</h3>

            <p className="p__price">
              {!theOffer.price && "FREE"}
              {theOffer.price && `$${theOffer.price}`}
            </p>
            <p className="p__location">
              {theOffer.User.Location.city +
                ", " +
                theOffer.User.Location.state}
            </p>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default SearchOffer;
