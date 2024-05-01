// Файл middlewares/games.js

// Импортируем модель
const games = require("../models/game");

const findAllGames = async (req, res, next) => {
  // По GET-запросу на эндпоинт /games найдём все игры
  req.gamesArray = await games
    .find({})
    // По GET-запросу на эндпоинт /games найдём все документы категорий
    // и с помощью метода populate запросим данные о связанных
    // категориях и пользователях
    .populate("categories")
    // .populate("users");
    .populate({
      // В path укажи поле, которое необходимо заполнить данными из других документов,
      // — в твоём случае это users.
      path: "users",
      // Затем в select укажи опцию, которая скажет методу,
      //какие поля пользователя нужно исключить из заполнения.
      //Здесь -password означает, что мы хотим исключить поле password
      // из данных пользователя. А "username" означает оставить только это поле.
      select: "-password",
      // select: "username",
    });

  console.log("middlewares/games.js");
  console.log(req.gamesArray);

  next();
};

//Создаем метод поиска игры по ID
const findGameById = async (req, res, next) => {
  console.log(
    `Запущен метод поиска игры по ID (findGameById): ${req.params.id}`
  );
  try {
    // Пробуем найти игру по id
    req.game = await games
      .findById(req.params.id) // Поиск записи по id
      .populate("categories") // Загрузка связанных записей о категориях
      .populate({
        path: "users",
        select: "-password",
      });
    next(); // Передаём управление в следующую функцию
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Игра не найдена" }));
  }
};

// Метод создания игры
const createGame = async (req, res, next) => {
  console.log("POST /games");
  try {
    console.log(req.body);
    req.game = await games.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка создания игры" }));
  }
};

// Метод обновления игры
const updateGame = async (req, res, next) => {
  console.log("PUT /games");
  try {
    // console.log(req.body);
    req.game = await games.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка обновления игры" }));
  }
};

// Экспортируем методы
module.exports = { findAllGames, findGameById, createGame, updateGame };
