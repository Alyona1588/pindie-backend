// Файл routes/categories.js

// Создаём роут для запросов категорий
const categoriesRouter = require("express").Router();

// Импортируем вспомогательные функции
const {
  findAllCategories,
  createCategory,
  findCategoryById,
  updateCategory,
} = require("../middlewares/categories");
const {
  sendAllCategories,
  sendCategoryCreated,
  sendCategoryById,
  sendCategoryUpdated,
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

categoriesRouter.put(
  "/categories/:id", // Слушаем запросы по эндпоинту
  findCategoryById, // Шаг 1. Находим игру по id из запроса
  // Шаг 2. Выполняем проверки для корректного обновления (опционально)
  updateCategory, // Шаг 3. Обновляем запись с игрой
  sendCategoryUpdated // Шаг 4. Возвращаем на клиент ответ с результатом обновления
);

// Экспортируем роут для использования в приложении — app.js
module.exports = categoriesRouter;
