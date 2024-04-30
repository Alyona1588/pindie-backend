// Файл middlewares/games.js

// Импортируем модель
const games = require("../models/game");

const findAllGames = async (req, res, next) => {
  // По GET-запросу на эндпоинт /games найдём все игры
  req.gamesArray = await games
    .find({})
    // По GET-запросу на эндпоинт /games найдём все документы категорий
    // и с помощью метода populate запросим данные о связанных
    // категориях и пользователях
    .populate("categories")
    .populate("users");

  console.log("middlewares/games.js");
  console.log(req.gamesArray);

  next();
};

// Экспортируем функцию поиска всех категорий
module.exports = findAllGames;
