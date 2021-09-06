const request = require("request");

const fetchMyIP = function (callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, JSON.parse(body).ip);
  });
};

const fetchMyGeoCoor = function (ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Geo Coor. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        return callback(error, null);
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching ISS flyover time. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const flyOver = JSON.parse(body).response;

      callback(null, flyOver);
    }
  );
};
const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchMyGeoCoor(ip, (error, coor) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coor, (error, response) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, response);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation,
  fetchMyIP,
  fetchMyGeoCoor,
  fetchISSFlyOverTimes,
};
