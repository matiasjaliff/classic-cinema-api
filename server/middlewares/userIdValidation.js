// Own modules

const User = require("../models/User");
const customErrors = require("../utils/customErrors");

// User ID validation middleware

const check = (req, res, next) => {
  const userId = req.params.userId;
  parseInt(userId) <= 0 || !parseInt(userId)
    ? next(customErrors.invalidUserId())
    : User.findByPk(userId).then((user) =>
        user ? next() : next(customErrors.userIdNotFound())
      );
};

module.exports = { check };
