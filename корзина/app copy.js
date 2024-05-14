const router = require("express").Router();
const film = require("../models/film");

// Сработает при GET-запросе на URL /films
router.get("/", (req, res) => {
  /* Напиши код здесь */
  film
    .find({})

    .then((films) => res.send({ data: films }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
});

module.exports = router;

//  req.gamesArray = await games.find({});
