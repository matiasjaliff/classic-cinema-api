// External modules

const express = require("express");
const axios = require("axios");
const Promise = require("bluebird");

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

// 4. Get movies in theaters (needed: ids and image paths)

tmdbRouter.get("/inTheaters", (req, res, next) => {
  axios
    .get(`${tmdbUrl}/discover/movie`, authHeader)
    .then((response) => {
      const moviesList = response.data.results;
      const moviesIdList = moviesList.map((movie) => movie.id);
      console.log(moviesIdList);
      return moviesIdList;
    })
    .then((moviesIdList) =>
      Promise.map(moviesIdList, (movieId) =>
        axios.get(`${tmdbUrl}/movie/${movieId}/images?language=en`, authHeader)
      )
    )
    .then((response) =>
      response.map((individualResponse) => individualResponse.data)
    )
    .then((images) => images.filter((image) => image.posters.length >= 1))
    .then((images) => res.status(200).send(images))
    .catch((err) => next(err));
});

// 5. Search movies

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

// 6. Get movie details

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

// 7. Get recommendations

tmdbRouter.get("/:movieId/recommendations", (req, res, next) => {
  const movieId = req.params.movieId;
  const { language, page } = req.query;
  axios
    .get(
      `${tmdbUrl}/movie/${movieId}/recommendations?language=${language}&page=${page}`,
      authHeader
    )
    .then((response) => {
      const movieRecommendations = response.data.results;
      const movieRecommendationsIdList = movieRecommendations.map(
        (movie) => movie.id
      );
      console.log(movieRecommendationsIdList);
      return movieRecommendationsIdList;
    })
    .then((movieRecommendationsIdList) =>
      Promise.map(movieRecommendationsIdList, (movieId) =>
        axios.get(`${tmdbUrl}/movie/${movieId}/images?language=en`, authHeader)
      )
    )
    .then((response) =>
      response.map((individualResponse) => individualResponse.data)
    )
    .then((images) => images.filter((image) => image.posters.length >= 1))
    .then((images) => res.status(200).send(images))
    .catch((err) => next(err));
});

// 8. Get movie images

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

// 9. Get movie videos

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

// 10. Get movie credits

tmdbRouter.get("/:movieId/credits", (req, res, next) => {
  const movieId = req.params.movieId;
  const { language } = req.query;
  axios
    .get(`${tmdbUrl}/movie/${movieId}/credits?language=${language}`, authHeader)
    .then((response) => {
      const movieCredits = response.data;
      res.status(200).send(movieCredits);
    })
    .catch((err) => next(err));
});

// 11. Get movie release dates

tmdbRouter.get("/:movieId/release", (req, res, next) => {
  const movieId = req.params.movieId;
  axios
    .get(`${tmdbUrl}/movie/${movieId}/release_dates`, authHeader)
    .then((response) => {
      const movieReleaseDates = response.data.results;
      res.status(200).send(movieReleaseDates);
    })
    .catch((err) => next(err));
});

module.exports = tmdbRouter;
