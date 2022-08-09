// Own modules
const User = require("../models/User");
const LikedMovie = require("../models/LikedMovie");
const LikedGenre = require("../models/LikedGenre");
const Follow = require("../models/Follow");

// 1. Create new user
const createUser = (req, res) => {
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
};

// 2. Get users
const getUsers = (req, res) => {
  User.findAll()
    .then((users) => res.status(200).send(users))
    .catch((error) => res.status(500).send(error));
};

// 3. Get user by id
const getUserById = (req, res) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => res.status(200).send(user))
    .catch((error) => res.status(500).send(error));
};

// 4. Modify user
const modifyUser = (req, res) => {
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
};

// 5. Delete user
const deleteUser = (req, res) => {
  const userId = req.params.userId;
  let deletedUser = {};
  let destroyRecord = [
    LikedMovie.destroy({ where: { user_id: userId } }),
    LikedGenre.destroy({ where: { user_id: userId } }),
    Follow.destroy({ where: { follower_id: userId } }),
    Follow.destroy({ where: { followed_id: userId } }),
  ];
  // Find the user, save it, destroy all its records, delete user and send deleted user
  User.findByPk(userId)
    .then((user) => (deletedUser = user))
    .then(() => Promise.all(destroyRecord))
    .then(() => User.destroy({ where: { user_id: userId } }))
    .then(() => res.status(200).send(deletedUser))
    .catch((error) => res.status(500).send(error));
};

module.exports = { createUser, getUsers, getUserById, modifyUser, deleteUser };
