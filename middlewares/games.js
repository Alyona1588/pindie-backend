// Файл middlewares/games.js

// Импортируем модель
const games = require("../models/game");

// Метод поиска всех игр в БД По GET-запросу на эндпоинт /games
const findAllGames = async (req, res, next) => {
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

  // console.log("middlewares/games.js");
  // console.log(req.gamesArray);

  next();
};

// Метод поиска игры по ID
const findGameById = async (req, res, next) => {
  // console.log(
  //   `Запущен метод поиска игры по ID (findGameById): ${req.params.id}`
  // );
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
    // console.log(req.body);
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

// Метод удаления игры по ID
const deleteGame = async (req, res, next) => {
  console.log(
    `Запущен метод удаления игры по ID (deleteGame): ${req.params.id}`
  );
  try {
    // Методом findByIdAndDelete по id находим и удаляем документ из базы данных
    req.game = await games.findByIdAndDelete(req.params.id);
    next(); // Передаём управление в следующую функцию
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Ошибка удаления игры" }));
  }
};

// __________________________ ПРОВЕРКИ___________________________________

//Проверяем наличие полей в теле запроса
const checkEmptyFields = async (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.image ||
    !req.body.link ||
    !req.body.developer
  ) {
    // Если какое-то из полей отсутствует, то не будем обрабатывать запрос дальше,
    // а ответим кодом 400 — данные неверны.
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Заполни все поля" }));
  } else {
    // Если всё в порядке, то передадим управление следующим миддлварам
    next();
  }
};

// Проверяем наличие жанра у игры
const checkIfCategoriesAvaliable = async (req, res, next) => {
  if (!req.body.categories || req.body.categories.length === 0) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Выбери хотя бы одну категорию" }));
  } else {
    next();
  }
};

// 1. Проверяем, есть ли users в теле запроса
// 2. // Cверим, на сколько изменился массив пользователей в запросе
//    // с актуальным значением пользователей в объекте game
//    // Если больше чем на единицу, вернём статус ошибки 400 с сообщением
const checkIfUsersAreSafe = async (req, res, next) => {
  // Проверим, есть ли users в теле запроса
  if (!req.body.users) {
    next();
    return;
  }

  if (req.body.users.length - 1 === req.game.users.length) {
    next();
    return;
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message:
          "Нельзя удалять пользователей или добавлять больше одного пользователя",
      })
    );
  }
};

// При создании новой игры необходима проверка,
// существует ли уже такая игра в БД
const checkIsGameExists = async (req, res, next) => {
  const isInArray = req.gamesArray.find((game) => {
    return req.body.name === game.name;
  });
  // Если нашли совпадение, то отвечаем кодом 400 и сообщением
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: "Игра с таким названием уже существует",
      })
    );
  } else {
    // Если категория, которую хотим создать, действительно новая, то передаём управление дальше
    next();
  }
};

// Экспортируем методы
module.exports = {
  findAllGames,
  findGameById,
  createGame,
  updateGame,
  deleteGame,
  checkEmptyFields,
  checkIfCategoriesAvaliable,
  checkIfUsersAreSafe,
  checkIsGameExists,
};
