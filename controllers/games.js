const sendAllGames = (req, res) => {
  // Установим заголовок ответа в формате JSON
  res.setHeader("Content-Type", "application/json");
  // Отправим данные в виде JSON-объекта,
  // которые подготовим в миддлваре findAllGames
  res.end(JSON.stringify(req.gamesArray));
};

const sendGameCreated = (req, res) => {
  // Установим заголовок ответа в формате JSON
  res.setHeader("Content-Type", "application/json");
  // Отправим данные в виде JSON-объекта,
  // которые подготовим в миддлваре findAllGames
  res.end(JSON.stringify(req.game));
};

// Экспортируем контроллер
module.exports = { sendAllGames, sendGameCreated };
