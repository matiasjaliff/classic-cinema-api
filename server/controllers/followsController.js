// Own modules

const Follow = require("../models/Follow");
const User = require("../models/User");
const customErrors = require("../utils/customErrors");

// 1. Get followed users

const getFollowedUsers = (req, res, next) => {
  const userId = req.params.userId;
  Follow.findAll({
    where: { follower_id: userId },
  })
    .then((follows) => res.status(200).send(follows))
    .catch((err) => next(err));
};

// 2. Add followed user

const addFollowedUser = (req, res, next) => {
  const userId = req.params.userId;
  const { followedId } = req.query;

  // Chequear que se ingresó un followed_id válido

  followedId === userId
    ? next(customErrors.relNotAllowed())
    : User.findByPk(followedId)
        .then((response) => (response ? true : false))
        .then((followedUserExists) => {
          followedUserExists
            ? Follow.findOrCreate({
                where: { follower_id: userId, followed_id: followedId },
                defaults: { follower_id: userId, followed_id: followedId },
              }).then(([follow, created]) =>
                created
                  ? res.sendStatus(201)
                  : next(customErrors.relAlreadyRegistered())
              )
            : next(customErrors.userIdNotFound());
        })
        .catch((err) => next(err));
};

// 3. Remove followed user

const removeFollowedUser = (req, res, next) => {
  const userId = req.params.userId;
  const { followedId } = req.query;

  // Chequear que se ingresó un followed_id válido

  Follow.findOne({
    where: { follower_id: userId, followed_id: followedId },
  })
    .then((follow) =>
      follow
        ? Follow.destroy({
            where: { follower_id: userId, followed_id: followedId },
          }).then(() => res.sendStatus(200))
        : next(customErrors.relNotFound())
    )
    .catch((err) => next(err));
};

module.exports = { getFollowedUsers, addFollowedUser, removeFollowedUser };
