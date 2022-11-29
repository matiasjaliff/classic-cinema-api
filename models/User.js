// External modules

const S = require("sequelize");
const bcrypt = require("bcrypt");

// Own modules

const db = require("../db");
const customErrors = require("../utils/customErrors");

// Model definition

class User extends S.Model {}
User.init(
  {
    user_id: {
      type: S.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },
    first_names: {
      type: S.DataTypes.STRING(30),
      allowNull: false,
      // Setter first checks if attribute is a string
      set(first_names) {
        if (typeof first_names !== "string") {
          throw customErrors.attributeIsNotString("first_names");
        } else {
          this.setDataValue("first_names", first_names.trim().toLowerCase());
        }
      },
      validate: {
        notNull: true,
        notEmpty: true,
        isAlpha: true,
        len: [2, 30],
      },
    },
    last_names: {
      type: S.DataTypes.STRING(30),
      allowNull: false,
      // Setter first checks if attribute is a string
      set(last_names) {
        if (typeof last_names !== "string") {
          throw customErrors.attributeIsNotString("last_names");
        } else {
          this.setDataValue("last_names", last_names.trim().toLowerCase());
        }
      },
      validate: {
        notNull: true,
        notEmpty: true,
        isAlpha: true,
        len: [2, 30],
      },
    },
    email: {
      type: S.DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      // Setter first checks if attribute is a string
      set(email) {
        if (typeof email !== "string") {
          throw customErrors.attributeIsNotString("email");
        } else {
          this.setDataValue("email", email.trim().toLowerCase());
        }
      },
      validate: {
        notNull: true,
        notEmpty: true,
        isEmail: true,
        len: [2, 30],
      },
    },
    salt: {
      type: S.DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    password: {
      type: S.DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    allow_notifications: {
      type: S.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notNull: true,
      },
    },
  },
  {
    sequelize: db,
    modelName: "user", // Model name MUST be in lowercase
    createdAt: "created_at", // Renames field
    updatedAt: "updated_at", // Renames field
  }
);

// Hooks

// Salt and hash generator

User.beforeValidate((user) => {
  return bcrypt
    .genSalt(8)
    .then((salt) => (user.salt = salt))
    .then(() => bcrypt.hash(user.password, user.salt))
    .then((hash) => (user.password = hash))
    .catch((error) => console.error(error));
});

module.exports = User;
