// External modules
const express = require("express");

// Own modules
const usersRouter = require("./users");
const tmdbRouter = require("./tmdb");

const router = express.Router();

router.use("/users", usersRouter);
router.use("/tmdb", tmdbRouter);

module.exports = router;