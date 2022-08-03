// External modules
const express = require("express");

// Own modules
const usersRouter = require("./users");

const router = express.Router();

router.use("/users", usersRouter);

module.exports = router;