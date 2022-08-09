// External modules
const express = require("express");

// Own modules
const User = require("../models/User");
const LikedMovie = require("../models/LikedMovie");
const LikedGenre = require("../models/LikedGenre");
const Follow = require("../models/Follow");

const usersRouter = express.Router();

// Check user existence
usersRouter.all("/:userId*", (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => (user ? next() : res.status(404).send("USER NOT FOUND")))
    .catch((error) => res.status(400).send(error));
});

// Requests

// A. Users

// A.1. Get all users
usersRouter.get("/", (req, res) => {
  User.findAll()
    .then((users) => res.status(200).send(users))
    .catch((error) => res.status(500).send(error));
});

// A.2. Get user by id
usersRouter.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => res.status(200).send(user))
    .catch((error) => res.status(500).send(error));
});

// A.3. Create new user
usersRouter.post("/", (req, res) => {
  const { first_names, last_names, email, password, allow_notifications } =
    req.body;
  User.findOrCreate({
    where: { email: email },
    defaults: { first_names, last_names, email, password, allow_notifications },
  })
    .then(([user, created]) =>
      created ? res.status(201).send(user) : res.status(409).send(user)
    )
    .catch((error) => res.status(500).send(error));
});

// A.4. Modify user
usersRouter.put("/:userId", (req, res) => {
  const userId = req.params.userId;
  const { first_names, last_names, email, password, allow_notifications } =
    req.body;
  User.update(
    { first_names, last_names, email, password, allow_notifications },
    { where: { user_id: userId } }
  )
    .then(() => User.findByPk(userId))
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch((error) => res.status(500).send(error));
});

// A.5. Delete user
usersRouter.delete("/:userId", (req, res) => {
  const userId = req.params.userId;
  let deletedUser = {};
  User.findByPk(userId)
    .then((user) => (deletedUser = user))
    .then(() => LikedMovie.destroy({ where: { user_id: userId } }))
    .then(() => LikedGenre.destroy({ where: { user_id: userId } }))
    .then(() => Follow.destroy({ where: { follower_id: userId } }))
    .then(() => Follow.destroy({ where: { followed_id: userId } }))
    .then(() => User.destroy({ where: { user_id: userId } }))
    .then(() => res.status(200).send(deletedUser))
    .catch((error) => res.status(500).send(error));
});

// B. User liked movies

// B.1. Get all liked movies
usersRouter.get("/:userId/movies", (req, res) => {
  const userId = req.params.userId;
  LikedMovie.findAll({
    where: { user_id: userId },
  })
    .then((likedMovies) => {
      res.status(200).send(likedMovies);
    })
    .catch((error) => res.status(500).send(error));
});

// B.2. Add liked movie
usersRouter.post("/:userId/movies", (req, res) => {
  const userId = req.params.userId;
  const { movieId } = req.query;
  LikedMovie.findOrCreate({
    where: { user_id: userId, movie_id: movieId },
    defaults: { user_id: userId, movie_id: movieId },
  })
    .then(([likedMovie, created]) => {
      created
        ? res.status(201).send(likedMovie)
        : res.status(409).send(likedMovie);
    })
    .catch((error) => res.status(500).send(error));
});

// B.3. Remove liked movie
usersRouter.delete("/:userId/movies", (req, res) => {
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
});

// C. User liked genres

// C.1. Get all liked genres
usersRouter.get("/:userId/genres", (req, res) => {
  const userId = req.params.userId;
  LikedGenre.findAll({
    where: { user_id: userId },
  })
    .then((likedGenres) => {
      res.status(200).send(likedGenres);
    })
    .catch((error) => res.status(500).send(error));
});

// C.2. Add liked genre
usersRouter.post("/:userId/genres", (req, res) => {
  const userId = req.params.userId;
  const { genreId } = req.query;
  LikedGenre.findOrCreate({
    where: { user_id: userId, genre_id: genreId },
    defaults: { user_id: userId, genre_id: genreId },
  })
    .then(([likedGenre, created]) => {
      created
        ? res.status(201).send(likedGenre)
        : res.status(409).send(likedGenre);
    })
    .catch((error) => res.status(500).send(error));
});

// C.3. Remove liked genre
usersRouter.delete("/:userId/genres", (req, res) => {
  const userId = req.params.userId;
  const { genreId } = req.query;
  LikedGenre.findOne({
    where: { user_id: userId, genre_id: genreId },
  })
    .then((likedGenre) => {
      if (likedGenre) {
        LikedGenre.destroy({
          where: { user_id: userId, genre_id: genreId },
        }).then(() => res.status(200).send(likedGenre));
      } else {
        res.status(404).send("LIKED GENRE NOT FOUND");
      }
    })
    .catch((error) => res.status(500).send(error));
});

// D. Followed users

// D.1. Get all followed users
usersRouter.get("/:userId/follows", (req, res) => {
  const userId = req.params.userId;
  Follow.findAll({
    where: { follower_id: userId },
  })
    .then((follows) => {
      res.status(200).send(follows);
    })
    .catch((error) => res.status(500).send(error));
});

// D.2. Add followed user
usersRouter.post("/:userId/follows", (req, res) => {
  const userId = req.params.userId;
  const { followedId } = req.query;
  if (userId === followedId) {
    res.status(409).send("USER CAN NOT FOLLOW ITSELF.");
  } else {
    User.findByPk(followedId)
      .then((response) => (response ? true : false))
      .then((followedUserExists) => {
        if (followedUserExists) {
          Follow.findOrCreate({
            where: { follower_id: userId, followed_id: followedId },
            defaults: { follower_id: userId, followed_id: followedId },
          }).then(([follow, created]) => {
            created
              ? res.status(201).send(follow)
              : res.status(409).send(follow);
          });
        } else {
          res.status(404).send("USER TO FOLLOW NOT FOUND.");
        }
      })
      .catch((error) => res.status(500).send(error));
  }
});

// D.3. Remove followed user
usersRouter.delete("/:userId/follows", (req, res) => {
  const userId = req.params.userId;
  const { followedId } = req.query;
  Follow.findOne({
    where: { follower_id: userId, followed_id: followedId },
  })
    .then((follow) => {
      if (follow) {
        Follow.destroy({
          where: { follower_id: userId, followed_id: followedId },
        }).then(() => res.status(200).send(follow));
      } else {
        res.status(404).send("FOLLOW-UP NOT FOUND");
      }
    })
    .catch((error) => res.status(500).send(error));
});

module.exports = usersRouter;
