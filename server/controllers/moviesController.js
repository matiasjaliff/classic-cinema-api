// Own modules
const LikedMovie = require("../models/LikedMovie");

// 1. Get liked movies
const getLikedMovies = (req, res) => {
  const userId = req.params.userId;
  LikedMovie.findAll({
    where: { user_id: userId },
  })
    .then((likedMovies) => res.status(200).send(likedMovies))
    .catch((error) => res.status(500).send(error));
};

// 2. Add liked movie
const addLikedMovie = (req, res) => {
  const userId = req.params.userId;
  const { movieId } = req.query;
  LikedMovie.findOrCreate({
    where: { user_id: userId, movie_id: movieId },
    defaults: { user_id: userId, movie_id: movieId },
  })
    .then(([likedMovie, created]) =>
      created
        ? res.status(201).send(likedMovie)
        : res.status(409).send(likedMovie)
    )
    .catch((error) => res.status(500).send(error));
};

// 3. Remove liked movie
const removeLikedMovie = (req, res) => {
  const userId = req.params.userId;
  const { movieId } = req.query;
  LikedMovie.findOne({
    where: { user_id: userId, movie_id: movieId },
  })
    .then((likedMovie) => {
      if (likedMovie) {
        LikedMovie.destroy({
          where: { user_id: userId, movie_id: movieId },
        }).then(() => res.status(200).send(likedMovie));
      } else {
        res.status(404).send("LIKED MOVIE NOT FOUND");
      }
    })
    .catch((error) => res.status(500).send(error));
};

module.exports = { getLikedMovies, addLikedMovie, removeLikedMovie };
