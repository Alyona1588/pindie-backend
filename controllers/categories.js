const sendAllCategories = (req, res) => {
  // Установим заголовок ответа в формате JSON
  res.setHeader("Content-Type", "application/json");
  // Отправим данные в виде JSON-объекта,
  // которые подготовим в миддлваре findAllCategories
  res.end(JSON.stringify(req.categoriesArray));
};

const sendCategoryById = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.category));
};

const sendCategoryCreated = (req, res) => {
  // Установим заголовок ответа в формате JSON
  res.setHeader("Content-Type", "application/json");
  // Отправим данные в виде JSON-объекта,
  // которые подготовим в миддлваре findAllCategories
  res.end(JSON.stringify(req.category));
  console.log("Создана запись в БД Коллекции Категроия");
};

const sendCategoryUpdated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify({ message: "Категория обновлена" }));
};

const sendCategoryDeleted = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify({ message: "Категория удалена" }));
};

// Экспортируем контроллер
module.exports = {
  sendAllCategories,
  sendCategoryById,
  sendCategoryCreated,
  sendCategoryUpdated,
  sendCategoryDeleted,
};
