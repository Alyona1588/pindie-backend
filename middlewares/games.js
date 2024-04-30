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

  // console.log("middlewares/games.js");
  //  console.log(req.gamesArray);

  next();
};

// Метод создания игры
const createGame = async (req, res, next) => {
  console.log("POST /games");
  try {
    console.log(req.body);
    req.game = await games.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка создания игры" }));
  }
};

// Экспортируем функцию поиска всех категорий
module.exports = { findAllGames, createGame };
