// Own modules
const LikedGenre = require("../models/LikedGenre");

// 1. Get liked genres
const getLikedGenres = (req, res) => {
  const userId = req.params.userId;
  LikedGenre.findAll({
    where: { user_id: userId },
  })
    .then((likedGenres) => res.status(200).send(likedGenres))
    .catch((error) => res.status(500).send(error));
};

// 2. Add liked genre
const addLikedGenre = (req, res) => {
  const userId = req.params.userId;
  const { genreId } = req.query;
  LikedGenre.findOrCreate({
    where: { user_id: userId, genre_id: genreId },
    defaults: { user_id: userId, genre_id: genreId },
  })
    .then(([likedGenre, created]) =>
      created
        ? res.status(201).send(likedGenre)
        : res.status(409).send(likedGenre)
    )
    .catch((error) => res.status(500).send(error));
};

// 3. Remove liked genre
const removeLikedGenre = (req, res) => {
  const userId = req.params.userId;
  const { genreId } = req.query;
  LikedGenre.findOne({
    where: { user_id: userId, genre_id: genreId },
  })
    .then((likedGenre) => {
      if (likedGenre) {
        LikedGenre.destroy({
          where: { user_id: userId, genre_id: genreId },
        }).then(() => res.status(200).send(likedGenre));
      } else {
        res.status(404).send("LIKED GENRE NOT FOUND");
      }
    })
    .catch((error) => res.status(500).send(error));
};

module.exports = { getLikedGenres, addLikedGenre, removeLikedGenre };
