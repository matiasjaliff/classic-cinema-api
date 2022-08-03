// External modules
const express = require("express");
const morgan = require("morgan");

// Own modules
const routes = require("./routes");
const db = require("./db");
const models = require("./models");

const PORT = 8080;

const app = express();

// Middlewares
app.use(morgan("tiny")); // Uses morgan to log every request
app.use(express.json()); // Uses express.json as body parser for every request
app.use("/api", routes); // Uses routes for requests to /api

// Error middleware
app.use((err, req, res, next) => {
  console.log("ERROR");
  console.log(err);
  res.status(500).send(err.message);
});

db.sync({ alter: true }) // Syncrhonizes the database
  .then(() =>
    console.log("All models in the database were syncronized successfully.")
  )
  .then(() =>
    // Binds and listens for connections on the specified port
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
  )
  .catch((err) => console.log(err));
