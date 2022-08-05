// External modules
const Sequelize = require("sequelize");

// Loads enviroment variables
const { DB_NAME } = require("../config");

// Creates a Sequelize instance to connect to cinemadb
const db = new Sequelize(DB_NAME, null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
