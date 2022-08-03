// External modules
const S = require("sequelize");
const bcrypt = require("bcrypt");

// Own modules
const db = require("../db");

class User extends S.Model {}
User.init(
  {
    user_id: {
      type: S.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_names: {
      type: S.DataTypes.STRING,
      allowNull: false,
      set(first_names) {
        this.setDataValue("first_names", first_names.toLowerCase());
      },
    },
    last_names: {
      type: S.DataTypes.STRING,
      allowNull: false,
      set(last_names) {
        this.setDataValue("last_names", last_names.toLowerCase());
      },
    },
    email: {
      type: S.DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    salt: {
      type: S.DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: S.DataTypes.STRING,
      allowNull: false,
    },
    allow_notifications: {
      type: S.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    modelName: "user", // Model name MUST be in lowercase
    createdAt: "created_at", // Renames field
    updatedAt: "updated_at", // Renames field
  }
);

User.beforeValidate((user) => {
  return bcrypt
    .genSalt(8)
    .then((salt) => (user.salt = salt))
    .then(() => bcrypt.hash(user.password, user.salt))
    .then((hash) => (user.password = hash))
    .catch((error) => console.error(error));
});

module.exports = User;
