// External modules
const Sequelize = require("sequelize");

// Loads enviroment variables
const { dbName } = require("../config");

// Creates a Sequelize instance to connect to cinemadb
const db = new Sequelize(dbName, null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
