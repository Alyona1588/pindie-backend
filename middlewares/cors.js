const allowedCors = [
  "https://practicum.yandex.ru",
  "https://students-projects.ru",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://shuremanochka-pindie.nomoredomainswork.ru",
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

  if (allowedCors.includes(origin)) {
    //   console.log("________________________CORS. Запрос с пинщди");
    // Если это наш друг
    res.header("Access-Control-Allow-Origin", origin); // Говорим: «Добро пожаловать!»
    // res.header("Access-Control-Allow-Origin", "*"); //Открываем доступ всем
  }
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
  );

  next();
}

module.exports = cors;
