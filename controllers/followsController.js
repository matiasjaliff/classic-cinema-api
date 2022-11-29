// Own modules

const Follow = require("../models/Follow");
const User = require("../models/User");
const customErrors = require("../utils/customErrors");

// 1. Get followed users

exports.getFollowed = (req, res, next) => {
  const userId = req.headers.userId;
  Follow.findAll({
    where: { follower_id: userId },
  })
    .then((follows) => res.status(200).send(follows))
    .catch((err) => next(err));
};

// 2. Add followed user

exports.addFollowed = (req, res, next) => {
  const userId = req.headers.userId;
  const { followedId } = req.query;
  parseInt(followedId) <= 0 || !parseInt(followedId)
    ? next(customErrors.invalidId())
    : followedId === userId
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
            : next(customErrors.idNotFound());
        })
        .catch((err) => next(err));
};

// 3. Remove followed user

exports.removeFollowed = (req, res, next) => {
  const userId = req.headers.userId;
  const { followedId } = req.query;
  parseInt(followedId) <= 0 || !parseInt(followedId)
    ? next(customErrors.invalidId())
    : Follow.findOne({
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
