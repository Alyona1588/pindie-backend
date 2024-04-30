// Файл routes/categories.js

// Создаём роут для запросов категорий
const categoriesRouter = require("express").Router();

// Импортируем вспомогательные функции
const {
  findAllCategories,
  createCategory,
} = require("../middlewares/categories");
const {
  sendAllCategories,
  sendCategoryCreated,
} = require("../controllers/categories");

// Обрабатываем GET-запрос с роутом '/categories'
categoriesRouter.get("/categories", findAllCategories, sendAllCategories);

// Обрабатываем POST-запрос с роутом '/categories'
categoriesRouter.post(
  "/categories",
  findAllCategories,
  createCategory,
  sendCategoryCreated
);

// Экспортируем роут для использования в приложении — app.js
module.exports = categoriesRouter;
