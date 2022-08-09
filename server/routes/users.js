// External modules
const express = require("express");

// Own modules
const userIdValidation = require("../middlewares/userIdValidation");
const userControllers = require("../controllers/userController");
const moviesControllers = require("../controllers/moviesController");
const genresControllers = require("../controllers/genresController");
const followsControllers = require("../controllers/followsController");

const usersRouter = express.Router();

// Check user existence
usersRouter.use("/:userId*", userIdValidation.check);

// Requests

// A. Users
usersRouter
  .route("/")
  .post(userControllers.createUser)
  .get(userControllers.getUsers);
usersRouter
  .route("/:userId")
  .get(userControllers.getUserById)
  .put(userControllers.modifyUser)
  .delete(userControllers.deleteUser);

// B. User liked movies
usersRouter
  .route("/:userId/movies")
  .post(moviesControllers.addLikedMovie)
  .get(moviesControllers.getLikedMovies)
  .delete(moviesControllers.removeLikedMovie);

// C. User liked genres
usersRouter
  .route("/:userId/genres")
  .post(genresControllers.addLikedGenre)
  .get(genresControllers.getLikedGenres)
  .delete(genresControllers.removeLikedGenre);

// D. Followed users
usersRouter
  .route("/:userId/follows")
  .post(followsControllers.addFollowedUser)
  .get(followsControllers.getFollowedUsers)
  .delete(followsControllers.removeFollowedUser);

module.exports = usersRouter;
