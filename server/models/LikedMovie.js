// External modules
const S = require("sequelize");

// Own modules
const db = require("../db");

class LikedMovie extends S.Model {}
LikedMovie.init(
  {
    liked_movie_id: {
      type: S.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    movie_id: {
      type: S.DataTypes.INTEGER,
      // allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "liked_movie", // Model name MUST be in lowercase
    createdAt: 'created_at', // Renames field
    updatedAt: 'updated_at', // Renames field
  }
);

module.exports = LikedMovie;
