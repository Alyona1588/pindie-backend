// Файл middlewares/categories.js

// Импортируем модель
const categories = require("../models/category");

const findAllCategories = async (req, res, next) => {
  //  console.log("");
  // console.log("Запуск middlewares - findAllCategories");
  // По GET-запросу на эндпоинт /categories найдём все документы категорий
  req.categoriesArray = await categories.find({});
  //  console.log("     Подготовлен массив с категориями req.categoriesArray");

  // console.log("middlewares/categories.js");
  // console.log(req.categoriesArray);

  next(/*console.log("Завершение работы middlewares - findAllCategories") */);
};

//Создаем метод поиска категории по ID
//response - ответ
// console.log(request); // Объект запроса
// console.log(response); // Объект ответа
const findCategoryById = async (req, res, next) => {
  // console.log(
  //   "Запуск middlewares - findCategoryById (метод поиска категории по ID)"
  // );
  console.log(`GET /categories/:id ${req.params.id}`);
  try {
    req.category = await categories.findById(req.params.id);
    // console.log(req); // Объект запроса
    // console.log(res); // Объект ответа

    next(console.log("Окончаниеработы middlewares - findCategoryById"));
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Категория не найдена" }));
  }
};

const createCategory = async (req, res, next) => {
  // console.log("");
  // console.log("Запуск middlewares - createCategory (метод создания категории)");
  // console.log("POST запрос по роуту /categories");
  try {
    req.category = await categories.create(req.body);
    next(console.log("Окончание работы middlewares - createCategory"));
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка создания категории" }));
  }
};

// Метод обновления категории
const updateCategory = async (req, res, next) => {
  console.log("PUT /categories");
  try {
    // console.log(req.body);
    req.category = await categories.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка обновления категории" }));
  }
};

//Создаем метод удаления категории по ID
const deleteCategory = async (req, res, next) => {
  // console.log(
  //   `Запущен метод удаления категории по ID (deleteCategory): ${req.params.id}`
  // );
  try {
    // Методом findByIdAndDelete по id находим и удаляем документ из базы данных
    req.category = await categories.findByIdAndDelete(req.params.id);
    next(); // Передаём управление в следующую функцию
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(404)
      .send(JSON.stringify({ message: "Ошибка удаления категории" }));
  }
};

// __________________________ ПРОВЕРКИ___________________________________

// Среди существующих в базе категорий пытаемся найти категорию с тем же именем,
// с которым хотим создать новую категорию
const checkIsCategoryExists = async (req, res, next) => {
  const isInArray = req.categoriesArray.find((category) => {
    return req.body.name === category.name;
  });
  // Если нашли совпадение, то отвечаем кодом 400 и сообщением
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: "Категория с таким названием уже существует",
      })
    );
  } else {
    // Если категория, которую хотим создать, действительно новая, то передаём управление дальше
    next();
  }
};

//Проверка на дублирование категории написана самой до прочтения checkIsCategoryExists
const categoryIsNew = async (req, res, next) => {
  console.log("Запуск middlewares - categoryIsNew ('Это новая категория?')");

  try {
    const rez4 = await categories.findOne({ name: req.body.name });
    if (rez4 === null) {
      //  console.log("Такой категории еще нет в БД");
      next(/* console.log("Завршение работы middlewares - categoryIsNew") */);
    } else {
      console.log("Такая запись УЖЕ ЕСТЬ В БД, транзакция отклонена!!!");
      res.setHeader("Content-Type", "application/json");
      res.status(400).send(
        JSON.stringify({
          message: "Такая категоия уже существует, транзакция отклонена!!!",
        })
      );
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: "Категория с таким названием уже существует",
      })
    );
  }
};

//Проверяем наличие полея name в теле запроса
const checkEmptyName = async (req, res, next) => {
  if (!req.body.name) {
    // Если поле отсутствует, то не будем обрабатывать запрос дальше,
    // а ответим кодом 400 — данные неверны.
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Заполни все поля" }));
  } else {
    // Если всё в порядке, то передадим управление следующим миддлварам
    next();
  }
};

// Экспортируем функцию поиска всех категорий
module.exports = {
  findAllCategories,
  findCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  categoryIsNew,
  checkIsCategoryExists,
  checkEmptyName,
};
