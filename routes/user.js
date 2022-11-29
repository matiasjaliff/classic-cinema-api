// External modules

const express = require("express");

// Own modules

const userControllers = require("../controllers/userController");
const moviesControllers = require("../controllers/moviesController");
const genresControllers = require("../controllers/genresController");
const followsControllers = require("../controllers/followsController");
const tokenValidation = require("../middlewares/tokenValidation");

// Router instance

const userRouter = express.Router();

// Requests

// A. Users

userRouter.get("/all", userControllers.getAllUsers);

userRouter
  .route("/")
  .post(userControllers.createUser)
  .get(tokenValidation.validate, userControllers.getUser)
  .put(tokenValidation.validate, userControllers.modifyUser)
  .delete(tokenValidation.validate, userControllers.deleteUser);

userRouter.post("/login", userControllers.login);

userRouter.post("/logout", tokenValidation.validate, userControllers.logout);

// Details

userRouter.use("/details", tokenValidation.validate);

// B. User liked movies

userRouter
  .route("/details/movies")
  .post(moviesControllers.addMovie)
  .get(moviesControllers.getMovies)
  .delete(moviesControllers.removeMovie);

// C. User liked genres

userRouter
  .route("/details/genres")
  .post(genresControllers.addGenre)
  .get(genresControllers.getGenres)
  .delete(genresControllers.removeGenre);

// D. Followed users

userRouter
  .route("/details/follows")
  .post(followsControllers.addFollowed)
  .get(followsControllers.getFollowed)
  .delete(followsControllers.removeFollowed);

module.exports = userRouter;
