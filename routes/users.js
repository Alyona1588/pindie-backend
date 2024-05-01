// Файл routes/users.js

// Создаём роут для запросов категорий
const usersRouter = require("express").Router();

// Импортируем вспомогательные функции
const {
  findAllUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
} = require("../middlewares/users");
const {
  sendAllUsers,
  sendUserCreated,
  sendUserById,
  sendUserUpdated,
  sendUserDeleted,
} = require("../controllers/users");

// Обрабатываем GET-запрос с роутом '/users'
usersRouter.get("/users", findAllUsers, sendAllUsers);

// Обрабатываем GET-запрос с роутом '/users/:id'
usersRouter.get("/users/:id", findUserById, sendUserById);

// Обрабатываем POST-запрос с роутом '/users'
usersRouter.post("/users", findAllUsers, createUser, sendUserCreated);

usersRouter.put(
  "/users/:id", // Слушаем запросы по эндпоинту
  findUserById, // Шаг 1. Находим игру по id из запроса
  // Шаг 2. Выполняем проверки для корректного обновления (опционально)
  updateUser, // Шаг 3. Обновляем запись с игрой
  sendUserUpdated // Шаг 4. Возвращаем на клиент ответ с результатом обновления
);

// Обрабатываем delete-запрос с роутом '/users/:id'
usersRouter.delete("/users/:id", deleteUser, sendUserDeleted);

// Экспортируем роут для использования в приложении — app.js
module.exports = usersRouter;
