// Own modules

const jwt = require("jsonwebtoken");

// Load enviroment variables

const { secret } = require("../config");

exports.validate = (req, res, next) => {
  const token = req.cookies.token;
  req.headers.userId = jwt.verify(token, secret).user_id;
  next();
};
