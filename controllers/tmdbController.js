// External modules

const axios = require("axios");

// Load enviroment variables

const { tmdbUrl, tmdbToken } = require("../config");

// Authorization header

const authHeader = {
  headers: {
    authorization: `Bearer ${tmdbToken}`,
  },
};

// 1. Get movie details

exports.movieDetails = (movieId, language = "en") => {
  return axios
    .get(`${tmdbUrl}/movie/${movieId}?language=${language}`, authHeader)
    .then((movieDetails) => movieDetails.data)
    .catch((err) => next(err));
};
