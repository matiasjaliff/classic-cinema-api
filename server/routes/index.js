// External modules

const express = require("express");

// Own modules

const usersRouter = require("./users");
const tmdbRouter = require("./tmdb");

// Router instance and middlewares

const router = express.Router();

router.use("/users", usersRouter);
router.use("/tmdb", tmdbRouter);

module.exports = router;
