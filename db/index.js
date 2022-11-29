// External modules

const Sequelize = require("sequelize");

// Load enviroment variables

// const {
//   dbName,
//   dbUser,
//   dbPass,
//   dbHost,
//   dbPort,
//   dbDialect,
// } = require("../config");

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbDialect = process.env.DB_DIALECT;

// Sequelize instance to connect to database

const db = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect,
  logging: false,
});

module.exports = db;
