// External modules

const S = require("sequelize");

// Own modules

const db = require("../db");

// Model definition

class Follow extends S.Model {}
Follow.init(
  {
    follow_id: {
      type: S.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },
  },
  {
    sequelize: db,
    modelName: "follow", // Model name MUST be in lowercase
    createdAt: "created_at", // Renames field
    updatedAt: "updated_at", // Renames field
  }
);

module.exports = Follow;
