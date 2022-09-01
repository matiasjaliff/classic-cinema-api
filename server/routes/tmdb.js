// External modules

const express = require("express");
const axios = require("axios");

// Load enviroment variables

const { tmdbUrl, tmdbToken } = require("../config");

// Router instance

const tmdbRouter = express.Router();

// Authorization header

const authHeader = {
  headers: {
    authorization: `Bearer ${tmdbToken}`,
  },
};

// Requests

// 1. Get API configuration

tmdbRouter.get("/configuration", (req, res, next) => {
  axios
    .get(`${tmdbUrl}/configuration`, authHeader)
    .then((response) => {
      const tmdbConfig = response.data;
      res.status(200).send(tmdbConfig);
    })
    .catch((err) => next(err));
});

// 2. Get genres list

tmdbRouter.get("/genres", (req, res, next) => {
  const { language } = req.query;
  axios
    .get(`${tmdbUrl}/genre/movie/list?language=${language}`, authHeader)
    .then((response) => {
      const genres = response.data;
      res.status(200).send(genres);
    })
    .catch((err) => next(err));
});

// 3. Get featured movie

tmdbRouter.get("/featured", (req, res, next) => {
  const year = Math.ceil(Math.random() * (2022 - 1950) + 1950);
  axios
    .get(
      `${tmdbUrl}/discover/movie?primary_release_year=${year}&sort_by=popularity.desc`,
      authHeader
    )
    .then((response) => {
      const featuredMovies = response.data.results;
      const selectedMovie = Math.trunc(featuredMovies.length * Math.random());
      res.status(200).send(featuredMovies[selectedMovie]);
    })
    .catch((err) => next(err));
});

// 8. Get movies in theaters

tmdbRouter.get("/inTheaters", (req, res, next) => {
  axios
    .get(`${tmdbUrl}/discover/movie`, authHeader)
    .then((response) => {
      const moviesList = response.data.results;
      res.status(200).send(moviesList);
    })
    .catch((err) => next(err));
});

// 3. Search movies

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
    .catch((err) => next(err));
});

// 4. Get movie details

tmdbRouter.get("/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;
  const { language } = req.query;
  axios
    .get(`${tmdbUrl}/movie/${movieId}?language=${language}`, authHeader)
    .then((response) => {
      const movieDetails = response.data;
      res.status(200).send(movieDetails);
    })
    .catch((err) => next(err));
});

// 5. Get recommendations

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
    .catch((err) => next(err));
});

// 6. Get movie images

tmdbRouter.get("/:movieId/images", (req, res, next) => {
  const movieId = req.params.movieId;
  const { language } = req.query;
  axios
    .get(`${tmdbUrl}/movie/${movieId}/images?language=${language}`, authHeader)
    .then((response) => {
      const movieImages = response.data;
      res.status(200).send(movieImages);
    })
    .catch((err) => next(err));
});

// 7. Get movie videos

tmdbRouter.get("/:movieId/videos", (req, res, next) => {
  const movieId = req.params.movieId;
  const { language } = req.query;
  axios
    .get(`${tmdbUrl}/movie/${movieId}/videos?language=${language}`, authHeader)
    .then((response) => {
      const movieVideos = response.data;
      res.status(200).send(movieVideos);
    })
    .catch((err) => next(err));
});

module.exports = tmdbRouter;
