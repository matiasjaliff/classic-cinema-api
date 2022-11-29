// Own modules

const User = require("./User");
const Follow = require("./Follow");
const LikedGenre = require("./LikedGenre");
const LikedMovie = require("./LikedMovie");

// User - Follow relationship (User as follower)

User.hasMany(Follow, { foreignKey: "follower_id" });
Follow.belongsTo(User, { as: "follower", foreignKey: "follower_id" });

// User - Follow relationship (User as followed)

User.hasMany(Follow, { foreignKey: "followed_id" });
Follow.belongsTo(User, { as: "followed", foreignKey: "followed_id" });

// User - Liked_Genre relationship

User.hasMany(LikedGenre, { foreignKey: "user_id" });
LikedGenre.belongsTo(User, { foreignKey: "user_id" });

// User - Liked_Movie relationship

User.hasMany(LikedMovie, { foreignKey: "user_id" });
LikedMovie.belongsTo(User, { foreignKey: "user_id" });

module.exports = { User, Follow, LikedGenre, LikedMovie };
