// Файл routes/games.js

// Создаём роут для запросов категорий
const categoriesRouter = require("express").Router();

// Импортируем вспомогательные функции
const { findAllGames, createGame } = require("../middlewares/games");
const { sendAllGames, sendGameCreated } = require("../controllers/games");

// Обрабатываем GET-запрос с роутом '/games'
categoriesRouter.get("/games", findAllGames, sendAllGames);

// Обрабатываем POST-запрос с роутом '/games'
categoriesRouter.post("/games", findAllGames, createGame, sendGameCreated);

// Экспортируем роут для использования в приложении — app.js
module.exports = categoriesRouter;
