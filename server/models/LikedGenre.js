// External modules
const S = require("sequelize");

// Own modules
const db = require("../db");

class LikedGenre extends S.Model {}
LikedGenre.init(
  {
    liked_genre_id: {
      type: S.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    genre_id: {
      type: S.DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "liked_genre", // Model name MUST be in lowercase
    createdAt: 'created_at', // Renames field
    updatedAt: 'updated_at', // Renames field
  }
);

module.exports = LikedGenre;
