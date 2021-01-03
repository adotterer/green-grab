import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import "./map.css";

function LocationCircle() {
  // return <img src={circle} />;
  return <div id="div__circle"></div>;
}
const GoogleMap = ({ specs }) => {
  // const [googleObj, setGoogleObj] = useState({});
  const { googleObj, zoomLevel } = specs;

  // useEffect(async () => {
  //   const obj = {
  //     address: location.city + ", " + location.state,
  //     lat: location.latitude,
  //     lng: location.longitude,
  //   };
  //   setGoogleObj(obj);
  //   console.log("use effect bitch", googleObj);
  // }, [location]);

  const locationExample = {
    address: "1600 Amphitheatre Parkway, Mountain View, california.",
    lat: 47.6062095,
    lng: -122.3320708,
  };
  console.log("googleObj", googleObj);
  // const googleObj = {
  //   address: location.city + ", " + location.state,
  //   lat: 47.6062095,
  //   lng: -122.3320708,
  // };

  // console.log("googleobj", googleObj);

  return (
    <div className="map">
      {!googleObj && "loading...."}
      {googleObj && (
        <div className="google-map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyDT_KxxLpoLwmlk3sXLpayAvW9z9_RodME",
            }}
            defaultCenter={locationExample}
            defaultZoom={zoomLevel}
          >
            {/* <LocationCircle
            lat={location.latitude}
            lng={location.longitude}
            // text={location.address}
          /> */}
          </GoogleMapReact>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
