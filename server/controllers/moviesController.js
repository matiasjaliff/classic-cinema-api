// Own modules

const LikedMovie = require("../models/LikedMovie");
const customErrors = require("../utils/customErrors");

// 1. Get liked movies

const getLikedMovies = (req, res, next) => {
  const userId = req.params.userId;
  LikedMovie.findAll({
    where: { user_id: userId },
  })
    .then((likedMovies) => res.status(200).send(likedMovies))
    .catch((err) => next(err));
};

// 2. Add liked movie

const addLikedMovie = (req, res, next) => {
  const userId = req.params.userId;
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

const removeLikedMovie = (req, res, next) => {
  const userId = req.params.userId;
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

module.exports = { getLikedMovies, addLikedMovie, removeLikedMovie };
