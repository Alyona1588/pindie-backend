// Файл routes/categories.js

// Создаём роут для запросов категорий
const categoriesRouter = require("express").Router();

// Импортируем вспомогательные функции
const {
  findAllCategories,
  createCategory,
  findCategoryById,
} = require("../middlewares/categories");
const {
  sendAllCategories,
  sendCategoryCreated,
  sendCategoryById,
} = require("../controllers/categories");

// Обрабатываем GET-запрос с роутом '/categories'
categoriesRouter.get("/categories", findAllCategories, sendAllCategories);

// Обрабатываем GET-запрос с роутом '/categories/:id'
categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);

// Обрабатываем POST-запрос с роутом '/categories'
categoriesRouter.post(
  "/categories",
  findAllCategories,
  createCategory,
  sendCategoryCreated
);

// Экспортируем роут для использования в приложении — app.js
module.exports = categoriesRouter;
