// Файл middlewares/users.js

// Импортируем модель
const users = require("../models/user");

const findAllUsers = async (req, res, next) => {
  // По GET-запросу на эндпоинт /users найдём всех пользователей
  req.usersArray = await users.find({});

  console.log("middlewares/users.js");
  console.log(req.usersArray);

  next();
};

// Экспортируем функцию поиска всех категорий
module.exports = findAllUsers;
