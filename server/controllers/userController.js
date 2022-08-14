// External modules

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Own modules

const User = require("../models/User");
const LikedMovie = require("../models/LikedMovie");
const LikedGenre = require("../models/LikedGenre");
const Follow = require("../models/Follow");
const customErrors = require("../utils/customErrors");

// Load enviroment variables

const { secret } = require("../config");

// Controllers

// 1. Get all users (NOT FOR PRODUCTION)

exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then((users) => res.status(200).send(users))
    .catch((err) => next(err));
};

// 2. Create user

exports.createUser = (req, res, next) => {
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

// 3. Get user

exports.getUser = (req, res, next) => {
  const userId = req.headers.userId;
  User.findByPk(userId)
    .then((user) => {
      const { user_id, first_names, last_names, email, allow_notifications } =
        user;
      const userData = {
        user_id,
        first_names,
        last_names,
        email,
        allow_notifications,
      };
      res.status(200).send(userData);
    })
    .catch((err) => next(err));
};

// 4. Modify user

exports.modifyUser = (req, res, next) => {
  const userId = req.headers.userId;
  const { first_names, last_names, email, password, allow_notifications } =
    req.body;
  User.update(
    { first_names, last_names, email, password, allow_notifications },
    { where: { user_id: userId } }
  )
    .then(() => User.findByPk(userId))
    .then((user) => {
      const payload = {
        user_id: user.user_id,
        first_names: user.first_names,
        last_names: user.last_names,
      };
      const token = jwt.sign(payload, secret, { expiresIn: 300000 });
      res.cookie("token", token, {
        expires: new Date(Date.now() + 300000),
        httpOnly: true,
      });
      res.sendStatus(200);
    })
    .catch((err) => next(err));
};

// 5. Delete user

exports.deleteUser = (req, res, next) => {
  const userId = req.headers.userId;
  let destroyRecord = [
    LikedMovie.destroy({ where: { user_id: userId } }),
    LikedGenre.destroy({ where: { user_id: userId } }),
    Follow.destroy({ where: { follower_id: userId } }),
    Follow.destroy({ where: { followed_id: userId } }),
  ];
  // Find the user, save it, destroy all its records, delete user and send deleted user
  Promise.all(destroyRecord)
    .then(() => User.destroy({ where: { user_id: userId } }))
    .then(() => {
      res.clearCookie("token");
      res.sendStatus(200);
    })
    .catch((err) => next(err));
};

// 6. Login

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let userData;
  // Verify email-password
  User.findOne({ where: { email: email } })
    .then((user) => {
      userData = user;
      return bcrypt.compare(password, userData.password);
    })
    .then((result) => {
      if (result) {
        const payload = {
          user_id: userData.user_id,
          first_names: userData.first_names,
          last_names: userData.last_names,
        };
        const token = jwt.sign(payload, secret, { expiresIn: 300000 });
        res.cookie("token", token, {
          expires: new Date(Date.now() + 300000),
          httpOnly: true,
        });
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => next(err));
};

// 7. Logout

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
};
