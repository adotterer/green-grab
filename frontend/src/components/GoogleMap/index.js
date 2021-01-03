import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import "./map.css";
import circle from "./greencircle.png";

function LocationCircle() {
  // return <img src={circle} />;
  return <div id="div__circle"></div>;
}
const GoogleMap = ({ specs }) => {
  const { location, zoomLevel } = specs;

  return (
    <div className="map">
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDT_KxxLpoLwmlk3sXLpayAvW9z9_RodME" }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationCircle
            lat={location.lat}
            lng={location.lng}
            // text={location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default GoogleMap;
