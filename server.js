// External modules

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Own modules

const routes = require("./routes");
const db = require("./db");
const models = require("./models");
const customErrors = require("./utils/customErrors");

// Load enviroment variables

const { port } = require("./config");

// Express instance

const app = express();

// Middlewares

app.use(cors());
app.use(morgan("dev")); // Uses morgan to log every request
app.use(express.json()); // Uses express.json as body parser for every request
app.use(cookieParser()); // Uses cookie-parser for every request

// Route middleware

app.use("/api", routes); // Uses routes for requests to /api
app.use((req, res, next) => next(customErrors.routeNotFound())); // Error for not found routes

// Error handler

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    name: err.name,
    message: err.message,
  });
});

// Database sync and server start

db.sync({ alter: true })
  .then(() =>
    console.log("All models in the database were syncronized successfully.")
  )
  .then(() =>
    app.listen(port, () => console.log(`Server listening on port ${port}`))
  )
  .catch((err) => console.log(err));
