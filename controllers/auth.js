// импорт библиотеки рабты с JWT токенами
const jwt = require("jsonwebtoken");
// Импортируем модель
const users = require("../models/user");
const path = require("path");

// 1-й пример авторизации через анализ длши и пароль
//
// const login = (req, res) => {
//   const { email, password } = req.body;

//   users
//     .findOne({ email })
//     .then((user) => {
//       if (!user) {
//         return Promise.reject(new Error("Неправильные почта или пароль"));
//       }

//       return bcrypt.compare(password, user.password).then((matched) => {
//         if (!matched) {
//           // Хеши не совпали — отклоняем промис
//           return Promise.reject(new Error("Неправильные почта или пароль"));
//         }
//         // Аутентификация успешна
//         return user; // Теперь user доступен
//       });
//     })
//     .then((user) => {
//       res
//         .status(200)
//         .send({ _id: user._id, username: user.username, email: user.email });
//     })
//     .catch((error) => {
//       res.status(401).send({ message: error.message });
//     });
// };

// controllers/auth.js

//
//
// Сделаем проверку почты и пароля частью схемы user
// Для этого нам понадобится новый метод findUserByCredentials,
// который принимает на вход два параметра — почту и пароль,
//  и возвращает объект юзера или ошибку.

const login = (req, res) => {
  console.log("Метод login - НАЧАЛО");

  const { email, password } = req.body;

  console.log("Запрос на авторизацию с параметрами req.body = ");
  console.log(req.body);

  users
    .findUserByCredentials(email, password)
    .then((user) => {
      console.log("Пользователь с параметрами req.body найден в БД");

      //Здесь создана переменную token для хранения токена
      // и запускаешь ее создание метод sign
      //Первый аргумент это данные, которые будут зашифрованы в токене.
      //В данном случае это объект с единственным полем _id пользователя
      // Второй аргумент -секретный ключ (укажи любой).
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        // Третий аргумент - параметр, определяющий время жизни токена.
        // expiresIn: '120ms' // 120 миллисекунд
        // expiresIn: '15m' // Пятнадцать минут
        // expiresIn: '2h' // Два часа
        expiresIn: "7d", // Семь дней
        // expiresIn: 3600, // один час, то есть 3600 секунд
      });
      //  console.log("Сформирован token = ");
      //   console.log(token);

      res.status(200).send({
        _id: user._id,
        username: user.username,
        email: user.email,
        jwt: token,
      });
      //  console.log("Вернули на фронт пакет с данными пользователя");
      //  console.log(res.send());
      // console.log({
      //   _id: user._id,
      //   username: user.username,
      //   email: user.email,
      //   jwt: token,
      // });
      // console.log(req.headers);
    })
    .catch((error) => {
      res.status(401).send({ message: error.message });
    });
};

const sendIndex = (req, res) => {
  // Если в Куках есть jwt-токет, то
  if (req.cookies.jwt) {
    try {
      // проеряем токен на актуальность
      jwt.verify(req.cookies.jwt, "some-secret-key");

      // Если токен актуальный перенаправляем на страницу админки.
      // Но браузер автоматически не перезагрузит страницу
      // return res.sendFile(path.join(__dirname, "../public/admin/dashboard.html"));
      // по этому используем этот код
      return res.redirect("/admin/dashboard");
    } catch (err) {
      // Если токен устарел, то перенаправляем на страницу авторизации
      res.sendFile(path.join(__dirname, "../public/index.html"));
    }
  }
  //  в случае отсутствия куки или JWT-токена внутри них,
  //  то перенаправляем на страницу авторизации
  res.sendFile(path.join(__dirname, "../public/index.html"));
};

const sendDashboard = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin/dashboard.html"));
};

// Не забываем экспортирвать функцию
module.exports = { login, sendIndex, sendDashboard };
