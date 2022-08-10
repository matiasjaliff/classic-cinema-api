// Own modules

const User = require("../models/User");
const LikedMovie = require("../models/LikedMovie");
const LikedGenre = require("../models/LikedGenre");
const Follow = require("../models/Follow");
const customErrors = require("../utils/customErrors");

// 1. Create new user

const createUser = (req, res, next) => {
  const { first_names, last_names, email, password, allow_notifications } =
    req.body;
  // Chequear mail
  if (typeof email !== "string")
    next(customErrors.attributeIsNotString("email"));
  User.findOrCreate({
    where: { email: email.trim().toLowerCase() },
    defaults: { first_names, last_names, email, password, allow_notifications },
  })
    .then(([user, created]) =>
      created ? res.sendStatus(201) : next(customErrors.emailAlreadyInUse())
    )
    .catch((err) => next(err));
};

// 2. Get users

const getUsers = (req, res, next) => {
  User.findAll()
    .then((users) => res.status(200).send(users))
    .catch((err) => next(err));
};

// 3. Get user by id

const getUserById = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
};

// 4. Modify user

const modifyUser = (req, res, next) => {
  const userId = req.params.userId;
  const { first_names, last_names, email, password, allow_notifications } =
    req.body;
  User.update(
    { first_names, last_names, email, password, allow_notifications },
    { where: { user_id: userId } }
  )
    .then(() => res.sendStatus(200))
    .catch((err) => next(err));
};

// 5. Delete user

const deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  let destroyRecord = [
    LikedMovie.destroy({ where: { user_id: userId } }),
    LikedGenre.destroy({ where: { user_id: userId } }),
    Follow.destroy({ where: { follower_id: userId } }),
    Follow.destroy({ where: { followed_id: userId } }),
  ];
  // Find the user, save it, destroy all its records, delete user and send deleted user
  Promise.all(destroyRecord)
    .then(() => User.destroy({ where: { user_id: userId } }))
    .then(() => res.sendStatus(200))
    .catch((err) => next(err));
};

module.exports = { createUser, getUsers, getUserById, modifyUser, deleteUser };
