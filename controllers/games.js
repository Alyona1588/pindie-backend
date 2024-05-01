const sendAllGames = (req, res) => {
  // Установим заголовок ответа в формате JSON
  res.setHeader("Content-Type", "application/json");
  // Отправим данные в виде JSON-объекта,
  // которые подготовим в миддлваре findAllGames
  res.end(JSON.stringify(req.gamesArray));
};

const sendGameById = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.game));
};

const sendGameCreated = (req, res) => {
  // Установим заголовок ответа в формате JSON
  res.setHeader("Content-Type", "application/json");
  // Отправим данные в виде JSON-объекта,
  // которые подготовим в миддлваре findAllGames
  res.end(JSON.stringify(req.game));
};

const sendGameUpdated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify({ message: "Игра обновлена" }));
};

const sendGameDeleted = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  // Отправляем на клиент найденный и удалённый элемент из базы данных
  res.end(JSON.stringify(req.game));
};

// Экспортируем контроллер
module.exports = {
  sendAllGames,
  sendGameById,
  sendGameCreated,
  sendGameUpdated,
  sendGameDeleted,
};
