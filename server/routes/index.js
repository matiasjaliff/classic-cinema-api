// External modules

const express = require("express");

// Own modules

const userRouter = require("./user");
const tmdbRouter = require("./tmdb");

// Router instance and middlewares

const router = express.Router();

router.use("/user", userRouter);
router.use("/tmdb", tmdbRouter);

module.exports = router;
