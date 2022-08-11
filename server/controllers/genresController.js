// Own modules

const LikedGenre = require("../models/LikedGenre");
const customErrors = require("../utils/customErrors");

// 1. Get liked genres

const getLikedGenres = (req, res, next) => {
  const userId = req.params.userId;
  LikedGenre.findAll({
    where: { user_id: userId },
  })
    .then((likedGenres) => res.status(200).send(likedGenres))
    .catch((err) => next(err));
};

// 2. Add liked genre

const addLikedGenre = (req, res, next) => {
  const userId = req.params.userId;
  const { genreId } = req.query;
  parseInt(genreId) <= 0 || !parseInt(genreId)
    ? next(customErrors.invalidId())
    : LikedGenre.findOrCreate({
        where: { user_id: userId, genre_id: genreId },
        defaults: { user_id: userId, genre_id: genreId },
      })
        .then(([likedGenre, created]) =>
          created
            ? res.sendStatus(201)
            : next(customErrors.relAlreadyRegistered())
        )
        .catch((err) => next(err));
};

// 3. Remove liked genre

const removeLikedGenre = (req, res, next) => {
  const userId = req.params.userId;
  const { genreId } = req.query;
  parseInt(genreId) <= 0 || !parseInt(genreId)
    ? next(customErrors.invalidId())
    : LikedGenre.findOne({
        where: { user_id: userId, genre_id: genreId },
      })
        .then((likedGenre) =>
          likedGenre
            ? LikedGenre.destroy({
                where: { user_id: userId, genre_id: genreId },
              }).then(() => res.sendStatus(200))
            : next(customErrors.relNotFound())
        )
        .catch((err) => next(err));
};

module.exports = { getLikedGenres, addLikedGenre, removeLikedGenre };
