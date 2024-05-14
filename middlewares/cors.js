const allowedCors = [
  "https://practicum.yandex.ru",
  "https://students-projects.ru",
  "http://localhost:3000",
  "http://localhost:3001",
];

function cors(req, res, next) {
  const origin = req.headers.origin; // Смотрим, кто стучится к серверу
  //console.log("________________________CORS. Начало функции");
  // console.log("Заголовок запроса ____req.headers = ");
  // console.log(req.headers);

  //
  // console.log("origin = ");
  // console.log(origin);
  //
  // res.header("Access-Control-Allow-Origin", "*"); //Открываем доступ всем

  //

  if (allowedCors.includes(origin)) {
    //   console.log("________________________CORS. Запрос с пинщди");
    // Если это наш друг
    res.header("Access-Control-Allow-Origin", origin); // Говорим: «Добро пожаловать!»
    // res.header("Access-Control-Allow-Origin", "*"); //Открываем доступ всем
  }

  next();
}

module.exports = cors;
