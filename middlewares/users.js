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

// Экспортируем функцию поиска всех категорий
module.exports = { findAllUsers, createUser };
