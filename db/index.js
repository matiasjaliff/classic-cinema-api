// External modules

const Sequelize = require("sequelize");

// Load enviroment variables

const {
  dbName,
  dbUser,
  dbPass,
  dbHost,
  dbPort,
  dbDialect,
} = require("../config");

// Sequelize instance to connect to database

const db = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect,
  logging: false,
});

module.exports = db;
