// Файл middlewares/users.js

// Импортируем модель
const users = require("../models/user");

const findAllUsers = async (req, res, next) => {
  // По GET-запросу на эндпоинт /users найдём всех пользователей
  req.usersArray = await users.find({});

  //  console.log("middlewares/users.js");
  //  console.log(req.usersArray);

  next();
};

//Создаем метод поиска пользователя по ID
const findUserById = async (req, res, next) => {
  console.log("Запущен метод поиска пользователя по ID (findUserById)");
  console.log("GET /users/:id");
  try {
    req.user = await users.findById(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(404)
      .send(JSON.stringify({ message: "Пользователь не найдена" }));
  }
};

const createUser = async (req, res, next) => {
  console.log("POST /users");
  try {
    console.log(req.body);
    req.user = await users.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка создания пользователя" }));
  }
};

// Метод обновления категории
const updateUser = async (req, res, next) => {
  console.log("PUT /users");
  try {
    // console.log(req.body);
    req.user = await users.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка обновления пользователя" }));
  }
};

//Создаем метод удаления пользователя по ID
const deleteUser = async (req, res, next) => {
  console.log(
    `Запущен метод удаления пользователя по ID (deleteUser): ${req.params.id}`
  );
  try {
    // Методом findByIdAndDelete по id находим и удаляем документ из базы данных
    req.user = await users.findByIdAndDelete(req.params.id);
    next(); // Передаём управление в следующую функцию
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(404)
      .send(JSON.stringify({ message: "Ошибка удаления пользователя" }));
  }
};

// Экспортируем функцию поиска всех категорий
module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
};
