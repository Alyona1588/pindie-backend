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
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  hashPassword,
} = require("../middlewares/users");
const {
  sendAllUsers,
  sendUserCreated,
  sendUserById,
  sendUserUpdated,
  sendUserDeleted,
  sendMe,
} = require("../controllers/users");

const { checkAuth } = require("../middlewares/auth");

// Обрабатываем GET-запрос с роутом '/users'
usersRouter.get("/users", findAllUsers, sendAllUsers);

// Обрабатываем GET-запрос с роутом '/users/:id'
usersRouter.get("/users/:id", findUserById, sendUserById);

// Обрабатываем POST-запрос (СОЗДАТЬ) с роутом '/users'
usersRouter.post(
  "/users",
  findAllUsers,
  checkEmptyNameAndEmailAndPassword,
  checkAuth, // Проверяем авторизацию пользователя по наличию JWT-токена
  hashPassword,
  createUser,
  sendUserCreated
);

// Обрабатываем PUT-запрос (ОБНОВИТЬ) с роутом '/users/:id'
usersRouter.put(
  "/users/:id", // Слушаем запросы по эндпоинту
  findUserById, // Шаг 1. Находим игру по id из запроса
  // checkIsUserExists,  Непонятно что это
  checkEmptyNameAndEmail, // Шаг 2. Выполняем проверки для корректного обновления (опционально)
  checkAuth, // Проверяем авторизацию пользователя по наличию JWT-токена
  updateUser, // Шаг 3. Обновляем запись с игрой
  sendUserUpdated // Шаг 4. Возвращаем на клиент ответ с результатом обновления
);

// Обрабатываем delete-запрос с роутом '/users/:id'
usersRouter.delete(
  "/users/:id",
  checkAuth, // Проверяем авторизацию пользователя по наличию JWT-токена
  deleteUser,
  sendUserDeleted
);

usersRouter.get("/me", checkAuth, sendMe);

// Экспортируем роут для использования в приложении — app.js
module.exports = usersRouter;
