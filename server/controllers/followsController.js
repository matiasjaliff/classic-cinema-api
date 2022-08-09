// Own modules
const Follow = require("../models/Follow");
const User = require("../models/User");

// 1. Get followed users
const getFollowedUsers = (req, res) => {
  const userId = req.params.userId;
  Follow.findAll({
    where: { follower_id: userId },
  })
    .then((follows) => res.status(200).send(follows))
    .catch((error) => res.status(500).send(error));
};

// 2. Add followed user
const addFollowedUser = (req, res) => {
  const userId = req.params.userId;
  const { followedId } = req.query;
  if (userId === followedId) {
    res.status(409).send("USER CAN NOT FOLLOW ITSELF.");
  } else {
    User.findByPk(followedId)
      .then((response) => (response ? true : false))
      .then((followedUserExists) => {
        if (followedUserExists) {
          Follow.findOrCreate({
            where: { follower_id: userId, followed_id: followedId },
            defaults: { follower_id: userId, followed_id: followedId },
          }).then(([follow, created]) =>
            created
              ? res.status(201).send(follow)
              : res.status(409).send(follow)
          );
        } else {
          res.status(404).send("USER TO FOLLOW NOT FOUND.");
        }
      })
      .catch((error) => res.status(500).send(error));
  }
};

// 3. Remove followed user
const removeFollowedUser = (req, res) => {
  const userId = req.params.userId;
  const { followedId } = req.query;
  Follow.findOne({
    where: { follower_id: userId, followed_id: followedId },
  })
    .then((follow) => {
      if (follow) {
        Follow.destroy({
          where: { follower_id: userId, followed_id: followedId },
        }).then(() => res.status(200).send(follow));
      } else {
        res.status(404).send("FOLLOW-UP NOT FOUND");
      }
    })
    .catch((error) => res.status(500).send(error));
};

module.exports = { getFollowedUsers, addFollowedUser, removeFollowedUser };
