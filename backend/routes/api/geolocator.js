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
geocoder
  .geocode("monroeville pa")
  .then((res) => {
    // console.log(res);
    // grab the lat and long
    console.log(res[0].city); // city
    console.log(res[0].administrativeLevels.level1short); // abbreviated state
    // return res;
  })
  .catch((err) => {
    console.log(err);
  });

// console.log(rosie);

// [
//   {
//     formattedAddress: "1240 Catalina Dr, Monroeville, PA 15146, USA",
//     latitude: 40.4181605,
//     longitude: -79.74944,
//     extra: {
//       googlePlaceId: "ChIJowmvlvnpNIgRy5SCoUAZ7TQ",
//       confidence: 1,
//       premise: null,
//       subpremise: null,
//       neighborhood: "Monroe Heights",
//       establishment: null,
//     },
//     administrativeLevels: {
//       level2long: "Allegheny County",
//       level2short: "Allegheny County",
//       level1long: "Pennsylvania",
//       level1short: "PA",
//     },
//     streetNumber: "1240",
//     streetName: "Catalina Drive",
//     city: "Monroeville",
//     country: "United States",
//     countryCode: "US",
//     zipcode: "15146",
//     provider: "google",
//   },
// ];
// 40.4181605 - 79.74944;
