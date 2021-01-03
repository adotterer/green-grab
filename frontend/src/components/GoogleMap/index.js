import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import "./map.css";

function LocationCircle() {
  // return <img src={circle} />;
  return <div id="div__circle"></div>;
}
const GoogleMap = ({ googleObj }) => {
  console.log("googleobj from GoogleMap", googleObj);

  return (
    <div className="map">
      {!googleObj && "loading...."}
      {googleObj && (
        <div className="google-map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyDT_KxxLpoLwmlk3sXLpayAvW9z9_RodME",
            }}
            defaultCenter={googleObj}
            defaultZoom={11}
          >
            <LocationCircle
              lat={googleObj.lat}
              lng={googleObj.lng}
              // text={location.address}
            />
          </GoogleMapReact>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
