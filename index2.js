const { nextISSTimesForMyLocation } = require("./iss_promised");

nextISSTimesForMyLocation()
  .then((passTimes) => {
    passTimes.forEach((time) => {
      console.log(
        `Next pass at ${new Date(0).setUTCSeconds(time.risetime)} for ${
          time.duration
        } seconds!`
      );
    });
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
