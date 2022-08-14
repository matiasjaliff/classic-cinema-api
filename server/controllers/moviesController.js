// External modules

const Promise = require("bluebird");

// Own modules

const LikedMovie = require("../models/LikedMovie");
const tmdbController = require("./tmdbController");
const customErrors = require("../utils/customErrors");

// 1. Get liked movies

exports.getMovies = (req, res, next) => {
  const userId = req.headers.userId;
  LikedMovie.findAll({
    where: { user_id: userId },
  })
    .then((likedMovies) =>
      Promise.map(likedMovies, (likedMovie) =>
        tmdbController.movieDetails(likedMovie.movie_id)
      )
    )
    .then((moviesDetails) => res.status(200).send(moviesDetails))
    .catch((err) => next(err));
};

// ALTERNATIVA QUE SÓLO DEVUEVLE IDs (TAL VEZ MEJORA LA VELOCIDAD)

// exports.getMovies = (req, res, next) => {
//   const userId = req.headers.userId;
//   LikedMovie.findAll({
//     where: { user_id: userId },
//   })
//     .then((likedMovies) => res.status(200).send(likedMovies))
//     .catch((err) => next(err));
// };

// 2. Add liked movie

exports.addMovie = (req, res, next) => {
  const userId = req.headers.userId;
  const { movieId } = req.query;
  parseInt(movieId) <= 0 || !parseInt(movieId)
    ? next(customErrors.invalidId())
    : LikedMovie.findOrCreate({
        where: { user_id: userId, movie_id: movieId },
        defaults: { user_id: userId, movie_id: movieId },
      })
        .then(([likedMovie, created]) =>
          created
            ? res.sendStatus(201)
            : next(customErrors.relAlreadyRegistered())
        )
        .catch((err) => next(err));
};

// 3. Remove liked movie

exports.removeMovie = (req, res, next) => {
  const userId = req.headers.userId;
  const { movieId } = req.query;
  parseInt(movieId) <= 0 || !parseInt(movieId)
    ? next(customErrors.invalidId())
    : LikedMovie.findOne({
        where: { user_id: userId, movie_id: movieId },
      })
        .then((likedMovie) =>
          likedMovie
            ? LikedMovie.destroy({
                where: { user_id: userId, movie_id: movieId },
              }).then(() => res.sendStatus(200))
            : next(customErrors.relNotFound())
        )
        .catch((err) => next(err));
};
