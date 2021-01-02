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
let rosie = geocoder
  .geocode("98199")
  .then((res) => {
    // grab the lat and long
    console.log(res[0].latitude);
    console.log(res[0].longitude);
    // return res;
  })
  .catch((err) => {
    console.log(err);
  });

// console.log(rosie);
