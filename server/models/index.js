// Own modules
const User = require("./User");
const Follow = require("./Follow");
const Liked_Genre = require("./Liked_Genre");
const Liked_Movie = require("./Liked_Movie");

// User - Follow relationship (User as follower)
User.hasMany(Follow, { foreignKey: "follower_id" });
Follow.belongsTo(User, { as: "follower", foreignKey: "follower_id" });

// User - Follow relationship (User as followed)
User.hasMany(Follow, { foreignKey: "followed_id" });
Follow.belongsTo(User, { as: "followed", foreignKey: "followed_id" });

// User - Liked_Genre relationship
User.hasMany(Liked_Genre, { foreignKey: "user_id" });
Liked_Genre.belongsTo(User, { foreignKey: "user_id" });

// User - Liked_Movie relationship
User.hasMany(Liked_Movie, { foreignKey: "user_id" });
Liked_Movie.belongsTo(User, { foreignKey: "user_id" });

module.exports = { User, Follow, Liked_Genre, Liked_Movie };
