const express = require("express");
const fetch = require("node-fetch");
const redis = require("redis");
const dotenv = require("dotenv");

// create express application instance
const app = express();

dotenv.config();

// store your password in .env
const password = process.env.REDIS_PASSWORD;

// create and connect redis client to local instance
const client = redis.createClient(6379);

client.auth(password, err => {
  if (err) throw err;
});

// echo redis errors to the console
client.on("error", err => {
  console.log("Error " + err);
});

// get photos list
app.get("/photos", (req, res) => {
  // key to store result in Redis store
  const photoRedisKey = "user:photos";

  // try fetching the result from Redis first in case we have it cached
  return client.get(photoRedisKey, (err, photos) => {
    // if that key exists in redis store
    if (photos) {
      return res.json({ source: "cache", data: JSON.parse(photos) });
    } else {
      // if key does not exist in redis store

      // fetch directly from remote
      fetch("https://jsonplaceholder.typicode.com/photos")
        .then(response => response.json())
        .then(photos => {
          // save the api response in redis store, data expire time in 3600
          client.setex(photoRedisKey, 3600, JSON.stringify(photos));

          // send json response to client
          return res.json({ source: "api", data: photos });
        })
        .catch(error => {
          console.log(error);

          // send error to the client
          return res.json(error.toString());
        });
    }
  });
});

// start express server at 3002 port
app.listen(3003, () => {
  console.log("Server listening on port: ", 3003);
});
