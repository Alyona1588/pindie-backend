// Файл middlewares/games.js

// Импортируем модель
const games = require("../models/game");

// Метод поиска всех игр в БД По GET-запросу на эндпоинт /games
const findAllGames = async (req, res, next) => {
  console.log("________________________Запрос findAllGames");
  // Поиск всех игр в проекте по заданной категории
  if (req.query["categories.name"]) {
    req.gamesArray = await games.findGameByCategory(
      req.query["categories.name"]
    );
    // console.log("________________________Запрос findAllGames. категория игры");
    next();
    return;
  }
  // Поиск всех игр в проекте
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
  console.log(
    `____2_Запущен метод поиска игры по ID (findGameById): ${req.params.id}`
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

    console.log("Найдена игра: ");
    console.log("req.game =");
    console.log(req.game);
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
  console.log("___8__Запущен метод Обновления игры (updateGame)");

  // console.log("req.body.users = ");
  // console.log(req.body.users);

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

//Проверка что это запрос на голосование
const checkIsVoteRequest = async (req, res, next) => {
  console.log("___3__Запущен метод сокращенной проверки  (checkIsVoteRequest)");
  console.log("req.body.users = ");
  console.log(req.body.users);

  console.log("req.body.users_permissions_users = ");
  console.log(req.body.users_permissions_users);

  console.log("req.game.users = ");
  console.log(req.game.users);

  console.log("req.game.users.length = ");
  console.log(req.game.users.length);

  // Если в запросе присылают только поле users
  if (Object.keys(req.body).length === 1 && req.body.users) {
    //Пропишем в запрос что это запрос на голосование
    req.isVoteRequest = true;
  }
  next();
};

// __________________________ ПРОВЕРКИ___________________________________

//Проверяем наличие полей в теле запроса
const checkEmptyFields = async (req, res, next) => {
  console.log(
    "___4__Запущен метод проверки наличие полей в теле запроса (checkEmptyFields)"
  );
  console.log(
    "Если запрос на голосование ( true), то можно не провярять наличиеследующих полей у игры ( !req.body.title, !req.body.description, !req.body.image, !req.body.link, !req.body.developer) полей у игры req.isVoteRequest = "
  );
  console.log(req.isVoteRequest);

  console.log(
    "Если (falsh), то выполняем проверки полей у игры ( !req.body.title, !req.body.description, !req.body.image, !req.body.link, !req.body.developer)"
  );
  if (req.isVoteRequest) {
    next();
    return;
  }
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
    res
      .status(400)
      .send(JSON.stringify({ message: "Заполни все поля checkEmptyFields" }));
  } else {
    // Если всё в порядке, то передадим управление следующим миддлварам
    next();
  }
};

// Проверяем наличие жанра у игры
const checkIfCategoriesAvaliable = async (req, res, next) => {
  console.log(
    "___5__Запущен метод проверки наличие жанра у игры (checkIfCategoriesAvaliable)"
  );
  console.log("Это запрос на голоосвнаие req.isVoteRequest = ");
  console.log(req.isVoteRequest);
  console.log("Если да то пропускаем проверку");

  if (req.isVoteRequest) {
    next();
    return;
  }

  console.log("req.game.categories =");
  // console.log(req.game.categories);

  console.log("req.game.categories.length =");
  //  console.log(req.game.categories.length);

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
  console.log(
    "___6__Запущен метод проверки наличие пользователя в теле запроса (checkIfUsersAreSafe)"
  );
  console.log(
    "ПОля с пользователем присуствуют в теле зпроса req.body.users = "
  );
  console.log(req.body.users);

  // console.log("req.body.users.length = ххх");
  // // console.log(req.body.users.length);

  // console.log("req.game.users = ");
  // console.log(req.game.users);

  // console.log("req.game.users.length = ХХХ");
  // // console.log(req.game.users.length);

  if (!req.body.users) {
    console.log(
      "в запросе отсуствуют поля с пользователями !req.body.users - falsh"
    );
    next();
    return;
  }

  if (req.body.users.length - 1 === req.game.users.length) {
    console.log(
      "Количество пользователей в запросе больше на 1 - Голоса не накручены"
    );
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
    return req.body.title === game.title;
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

// СООБЩЕНИЕ В КОНСОЛЬ
const massage = (req, res, next) => {
  console.log("____1_Получен PUT запрос на обновление игры");
  console.log("req.params.id = ");
  console.log(req.params.id);

  console.log("req. = ");
  console.log(req);

  next();
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
  checkIsVoteRequest,
  massage,
};
