// Файл routes/games.js

// Создаём роут для запросов категорий
const gamesRouter = require("express").Router();

// Импортируем вспомогательные функции
const {
  findAllGames,
  createGame,
  findGameById,
} = require("../middlewares/games");
const {
  sendAllGames,
  sendGameCreated,
  sendGameById,
} = require("../controllers/games");

// Обрабатываем GET-запрос с роутом '/games'
gamesRouter.get("/games", findAllGames, sendAllGames);

// Обрабатываем GET-запрос с роутом '/games/:id'
gamesRouter.get("/games/:id", findGameById, sendGameById);

// Обрабатываем POST-запрос с роутом '/games'
gamesRouter.post("/games", findAllGames, createGame, sendGameCreated);

// Экспортируем роут для использования в приложении — app.js
module.exports = gamesRouter;
