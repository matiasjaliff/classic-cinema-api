// External modules
const express = require("express");
const axios = require("axios");

// Loads enviroment variables
const { TMDB_URL, TMDB_TOKEN } = require("../config");

const tmdbRouter = express.Router();

// Authorization header
const authHeader = {
  headers: {
    authorization: TMDB_TOKEN,
  },
};

// Request movie details
tmdbRouter.get("/:movieId", (req, res, next) => {
  axios
    .get(`${TMDB_URL}movie/${req.params.movieId}`, authHeader)
    .then((response) => {
      const movieDetails = response.data;
      console.log("PELI/////////////////////", Object.keys(movieDetails));
      res.status(200).send(movieDetails);
    })
    .catch((error) => console.error(error.response.data));
});

module.exports = tmdbRouter;
