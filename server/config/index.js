// External modules
const dotenv = require("dotenv");

dotenv.config();

const { PORT, LOCAL_URL, DB_NAME, TMDB_URL, TMDB_TOKEN } = process.env;

module.exports = { PORT, LOCAL_URL, DB_NAME, TMDB_URL, TMDB_TOKEN };
