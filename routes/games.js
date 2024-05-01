// Файл routes/games.js

// Создаём роут для запросов категорий
const gamesRouter = require("express").Router();

// Импортируем вспомогательные функции
const {
  findAllGames,
  createGame,
  findGameById,
  updateGame,
} = require("../middlewares/games");
const {
  sendAllGames,
  sendGameCreated,
  sendGameById,
  sendGameUpdated,
} = require("../controllers/games");

// Обрабатываем GET-запрос с роутом '/games'
gamesRouter.get("/games", findAllGames, sendAllGames);

// Обрабатываем GET-запрос с роутом '/games/:id'
gamesRouter.get("/games/:id", findGameById, sendGameById);

// Обрабатываем POST-запрос с роутом '/games'
gamesRouter.post("/games", findAllGames, createGame, sendGameCreated);

gamesRouter.put(
  "/games/:id", // Слушаем запросы по эндпоинту
  findGameById, // Шаг 1. Находим игру по id из запроса
  // Шаг 2. Выполняем проверки для корректного обновления (опционально)
  updateGame, // Шаг 3. Обновляем запись с игрой
  sendGameUpdated // Шаг 4. Возвращаем на клиент ответ с результатом обновления
);

// Экспортируем роут для использования в приложении — app.js
module.exports = gamesRouter;
