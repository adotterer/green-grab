const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "google",

  // Optional depending on the providers
  // fetch: customFetchImplementation,
  apiKey: "AIzaSyDT_KxxLpoLwmlk3sXLpayAvW9z9_RodME", // for Mapquest, OpenCage, Google Premier
  // formatter: "object",
};

const geocoder = NodeGeocoder(options);

// Using callback
// geocoder
//   .geocode("monroeville pa")
//   .then((res) => {
//     // console.log(res);
//     // grab the lat and long
//     console.log(res[0].city); // city
//     console.log(res[0].administrativeLevels.level1short); // abbreviated state
//     // return res;
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const createLocationObj = async (location) => {
  const res = await geocoder.geocode(location);
  const obj = res[0];
  const {
    latitude,
    longitude,
    city,
    administrativeLevels: { level1short },
  } = obj;

  const state = level1short;

  return { latitude, longitude, city, state };
};

module.exports = { createLocationObj };
