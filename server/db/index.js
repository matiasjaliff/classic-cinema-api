// External modules

const Sequelize = require("sequelize");

// Load enviroment variables

const { dbName } = require("../config");

// Sequelize instance to connect to database

const db = new Sequelize(dbName, null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
