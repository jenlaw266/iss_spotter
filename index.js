// index.js
const { fetchMyIP, fetchMyGeoCoor, fetchISSFlyOverTimes } = require("./iss");
//let myIP = null;

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned IP:", ip);
  //myIP = ip;
}); //.then((myIP) => {
fetchMyGeoCoor("24.84.208.159", (error, coor) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned coor: ", coor);
});
//});
fetchISSFlyOverTimes(
  { latitude: 49.2155, longitude: -123.1427 },
  (error, response) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    console.log("It worked! Returned response: ", response);
  }
);
