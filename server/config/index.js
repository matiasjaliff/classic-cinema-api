// External modules

const dotenv = require("dotenv");

// Load enviroment variables

dotenv.config();
const enviroment = process.env;

const port = enviroment.PORT || 3000;
const localUrl = enviroment.LOCAL_URL || "http://localhost";
const dbName = enviroment.DB_NAME || "cinemadb";
const tmdbUrl = enviroment.TMDB_URL || "https://api.themoviedb.org/3";
const tmdbToken = enviroment.TMDB_TOKEN || "";

module.exports = { port, localUrl, dbName, tmdbUrl, tmdbToken };
