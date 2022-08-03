// External modules
const express = require("express");

// Own modules
const User = require("../models/User");

const usersRouter = express.Router();

usersRouter.post("/", (req, res, next) => {
  const { first_names, last_names, email, password, allow_notifications } = req.body;
  User.findOrCreate({
    where: { email: email },
    defaults: { first_names, last_names, email, password, allow_notifications },
  })
    .then(([user, created]) => {
      console.log("CREATED: ", created);
      console.log("USER: ", user);
      created ? res.status(201).send(user) : res.status(400).send(user);
    })
    .catch((error) => {
      console.error(error);
      next();
    });
});

usersRouter.get("/", (req, res, next) => {
  User.findAll()
    .then((users) => {
      console.log(users);
      res.status(200).send(users);
    })
    .catch((error) => {
      console.error(error);
      next();
    });
});

usersRouter.get("/:id", (req, res, next) => {
  const user_id = req.params.id;
  User.findByPk(user_id)
    .then((user) => {
      console.log(user);
      user ? res.status(200).send(user) : res.sendStatus(404);
    })
    .catch((error) => {
      console.dir(error);
      next();
    });
});

module.exports = usersRouter;
