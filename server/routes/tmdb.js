// External modules
const express = require("express");
const axios = require("axios");

// Load enviroment variables
const { tmdbUrl, tmdbToken } = require("../config");
const { response } = require("express");

const tmdbRouter = express.Router();

// Authorization header
const authHeader = {
  headers: {
    authorization: `Bearer ${tmdbToken}`,
  },
};

// Requests

// 01. Get API configuration
tmdbRouter.get("/configuration", (req, res, next) => {
  axios
    .get(`${tmdbUrl}/configuration`, authHeader)
    .then((response) => {
      const tmdbConfig = response.data;
      res.status(200).send(tmdbConfig);
    })
    .catch((error) => console.error(error.response.data));
});

// 02. Get genres list
tmdbRouter.get("/genres", (req, res, next) => {
  const { language } = req.query;
  axios
    .get(`${tmdbUrl}/genre/movie/list?language=${language}`, authHeader)
    .then((response) => {
      const genres = response.data;
      res.status(200).send(genres);
    })
    .catch((error) => console.error(error.response.data));
});

// 03. Search movies
tmdbRouter.get("/search", (req, res, next) => {
  const { query, language, page, include_adult } = req.query;
  axios
    .get(
      `${tmdbUrl}//search/movie?query=${query}&language=${language}&page=${page}&include_adult${include_adult}`,
      authHeader
    )
    .then((response) => {
      const movies = response.data;
      res.status(200).send(movies);
    })
    .catch((error) => console.error(error.response.data));
});

// 04. Get movie details
tmdbRouter.get("/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;
  const { language } = req.query;
  axios
    .get(`${tmdbUrl}/movie/${movieId}?language=${language}`, authHeader)
    .then((response) => {
      const movieDetails = response.data;
      res.status(200).send(movieDetails);
    })
    .catch((error) => console.error(error.response.data));
});

// 05. Get recommendations
tmdbRouter.get("/:movieId/recommendations", (req, res, next) => {
  const movieId = req.params.movieId;
  const { language, page } = req.query;
  axios
    .get(
      `${tmdbUrl}/movie/${movieId}/recommendations?language=${language}&page=${page}`,
      authHeader
    )
    .then((response) => {
      const movieRecommendations = response.data;
      res.status(200).send(movieRecommendations);
    })
    .catch((error) => console.error(error.response.data));
});

// 06. Get movie images
tmdbRouter.get("/:movieId/images", (req, res, next) => {
  const movieId = req.params.movieId;
  const { language } = req.query;
  axios
    .get(
      `${tmdbUrl}/movie/${movieId}/images?language=${language}`,
      authHeader
    )
    .then((response) => {
      const movieImages = response.data;
      res.status(200).send(movieImages);
    })
    .catch((error) => console.error(error.response.data));
});

// 07. Get movie videos
tmdbRouter.get("/:movieId/videos", (req, res, next) => {
  const movieId = req.params.movieId;
  const { language } = req.query;
  axios
    .get(
      `${tmdbUrl}/movie/${movieId}/videos?language=${language}`,
      authHeader
    )
    .then((response) => {
      const movieVideos = response.data;
      res.status(200).send(movieVideos);
    })
    .catch((error) => console.error(error.response.data));
});

module.exports = tmdbRouter;
