const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// const { usersRouter, gamesRouter, categoriesRouter } = require("./routes");

const connectToDatabase = require("./database/connect");
const cors = require("./middlewares/cors");
const apiRouter = require("./routes/apiRouter");

const app = express();
const PORT = 3000;

connectToDatabase();

app.use(
  cors,
  bodyParser.json(),
  express.static(path.join(__dirname, "public")),
  apiRouter // Добавляем

  //, pagesRouter // Непонятно что это

  //  usersRouter,   // Удаляем
  //  gamesRouter,   // Удаляем
  //  categoriesRouter // Удаляем
);

app.listen(PORT, () => {
  console.log(
    `_____________________________________________________РАЗДЕЛИТЕЛЬ ЗАПУСКА СЕРВЕРА___`
  );
  console.log(`Сервер запущен по адресу: http://localhost:${PORT}`);
});
