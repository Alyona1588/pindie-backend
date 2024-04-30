// Файл routes/games.js

// Создаём роут для запросов категорий
const categoriesRouter = require("express").Router();

// Импортируем вспомогательные функции
const findAllGames = require("../middlewares/games");
const sendAllGames = require("../controllers/games");

// Обрабатываем GET-запрос с роутом '/games'
categoriesRouter.get("/games", findAllGames, sendAllGames);

// Экспортируем роут для использования в приложении — app.js
module.exports = categoriesRouter;
