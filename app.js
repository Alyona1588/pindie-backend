const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// const { usersRouter, gamesRouter, categoriesRouter } = require("./routes");

const connectToDatabase = require("./database/connect");
const cors = require("./middlewares/cors");
const apiRouter = require("./routes/apiRouter");
const cookieParser = require("cookie-parser");
const pagesRouter = require("./routes/pages");

const app = express();
const PORT = 3001;

connectToDatabase();

app.use(
  cors,
  cookieParser(), // Добавляем миддлвар для работы с куки
  pagesRouter, // Добавляем роутер для страниц
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
