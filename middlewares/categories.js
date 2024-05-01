// Файл middlewares/categories.js

// Импортируем модель
const categories = require("../models/category");

const findAllCategories = async (req, res, next) => {
  // По GET-запросу на эндпоинт /categories найдём все документы категорий
  req.categoriesArray = await categories.find({});

  // console.log("middlewares/categories.js");
  // console.log(req.categoriesArray);

  next();
};

//Создаем метод поиска категории по ID
const findCategoryById = async (req, res, next) => {
  console.log("Запущен метод поиска категории по ID (findCategoryById)");
  console.log("GET /categories/:id");
  try {
    req.category = await categories.findById(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Категория не найдена" }));
  }
};

const createCategory = async (req, res, next) => {
  console.log("POST /categories");
  try {
    console.log(req.body);
    req.category = await categories.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка создания категории" }));
  }
};

// Экспортируем функцию поиска всех категорий
module.exports = { findAllCategories, findCategoryById, createCategory };
