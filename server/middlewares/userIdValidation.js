// Own modules
const User = require("../models/User");

const check = (req, res, next) => {
  const userId = req.params.userId;
  if (parseInt(userId) <= 0 || !parseInt(userId)) {
    const err = new Error(`INVALID USER ID. MUST BE A POSITIVE NUMBER`);
    err.status = 400;
    return next(err);
  }
  User.findByPk(userId).then((user) => {
    if (user) {
      next();
    } else {
      const err = new Error("USER NOT FOUND");
      err.status = 404;
      next(err);
    }
  });
};

module.exports = { check };
