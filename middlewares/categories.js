// Файл middlewares/categories.js

// Импортируем модель
const categories = require("../models/category");

const findAllCategories = async (req, res, next) => {
  console.log("");
  console.log("Запуск middlewares - findAllCategories");
  // По GET-запросу на эндпоинт /categories найдём все документы категорий
  req.categoriesArray = await categories.find({});
  console.log("     Подготовлен массив с категориями req.categoriesArray");

  // console.log("middlewares/categories.js");
  // console.log(req.categoriesArray);

  next(console.log("Завершение работы middlewares - findAllCategories"));
};

//Создаем метод поиска категории по ID
//response - ответ
// console.log(request); // Объект запроса
// console.log(response); // Объект ответа

const findCategoryById = async (req, res, next) => {
  console.log(
    "Запуск middlewares - findCategoryById (метод поиска категории по ID)"
  );
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
  console.log("");
  console.log("Запуск middlewares - createCategory (метод создания категории)");
  console.log("POST запрос по роуту /categories");
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
  console.log(
    `Запущен метод удаления категории по ID (deleteCategory): ${req.params.id}`
  );
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

//Проверка на дублирование категории
const categoryIsNew = async (req, res, next) => {
  console.log("Запуск middlewares - categoryIsNew ('Это новая категория?')");

  try {
    const rez4 = await categories.findOne({ name: req.body.name });
    if (rez4 === null) {
      console.log("Такой категории еще нет в БД");
      next(console.log("Завршение работы middlewares - categoryIsNew"));
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
    res
      .status(404)
      .send(JSON.stringify({ message: "Ошибка создания категории" }));
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
};
