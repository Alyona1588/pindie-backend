// Файл routes/users.js

// Создаём роут для запросов категорий
const usersRouter = require("express").Router();

// Импортируем вспомогательные функции
const {
  findAllUsers,
  createUser,
  findUserById,
} = require("../middlewares/users");
const {
  sendAllUsers,
  sendUserCreated,
  sendUserById,
} = require("../controllers/users");

// Обрабатываем GET-запрос с роутом '/users'
usersRouter.get("/users", findAllUsers, sendAllUsers);

// Обрабатываем GET-запрос с роутом '/users/:id'
usersRouter.get("/users/:id", findUserById, sendUserById);

// Обрабатываем POST-запрос с роутом '/users'
usersRouter.post("/users", findAllUsers, createUser, sendUserCreated);

// Экспортируем роут для использования в приложении — app.js
module.exports = usersRouter;
