// External modules

const dotenv = require("dotenv");

// Load enviroment variables

dotenv.config();
const enviroment = process.env;

const port = enviroment.PORT || 3000;
const localUrl = enviroment.LOCAL_URL || "http://localhost";
const secret = enviroment.SECRET || "juanitoby";
const tmdbUrl = enviroment.TMDB_URL || "https://api.themoviedb.org/3";
const tmdbToken = enviroment.TMDB_TOKEN || "";

const dbName = enviroment.DB_NAME || "cinemadb";
const dbUser = enviroment.DB_USER;
const dbPass = enviroment.DB_PASSWORD;
const dbHost = enviroment.DB_HOST;
const dbPort = enviroment.DB_PORT;
const dbDialect = enviroment.DB_DIALECT;

module.exports = {
  port,
  localUrl,
  secret,
  tmdbUrl,
  tmdbToken,
  dbName,
  dbUser,
  dbPass,
  dbHost,
  dbPort,
  dbDialect,
};
