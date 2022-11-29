// External modules

const S = require("sequelize");

// Own modules

const db = require("../db");

// Model definition

class LikedMovie extends S.Model {}
LikedMovie.init(
  {
    liked_movie_id: {
      type: S.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },
    movie_id: {
      type: S.DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        isInt: true,
      },
    },
  },
  {
    sequelize: db,
    modelName: "liked_movie", // Model name MUST be in lowercase
    createdAt: "created_at", // Renames field
    updatedAt: "updated_at", // Renames field
  }
);

module.exports = LikedMovie;
