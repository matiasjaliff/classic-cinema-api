// External modules
const express = require("express");
const morgan = require("morgan");

// Own modules
const routes = require("./routes");
const db = require("./db");
const models = require("./models");

// Loads enviroment variables
const { port } = require("./config");

const app = express();

// Middlewares
app.use(morgan("dev")); // Uses morgan to log every request
app.use(express.json()); // Uses express.json as body parser for every request
app.use("/api", routes); // Uses routes for requests to /api

// Error middleware
app.use((req, res, next) => {
  const err = new Error("ROUTE NOT FOUND");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status,
    name: err.name,
    message: err.message,
  });
});

db.sync({ alter: true }) // Syncrhonizes the database
  .then(() =>
    console.log("All models in the database were syncronized successfully.")
  )
  .then(() =>
    // Binds and listens for connections on the specified port
    app.listen(port, () => console.log(`Server listening on port ${port}`))
  )
  .catch((err) => console.log(err));
