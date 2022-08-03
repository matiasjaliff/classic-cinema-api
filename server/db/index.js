// External modules
const Sequelize = require("sequelize");

// Creates a Sequelize instance to connect to cinemadb
const db = new Sequelize("cinemadb", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;