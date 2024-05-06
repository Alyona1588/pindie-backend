// импорт библиотеки рабты с JWT токенами
const jwt = require("jsonwebtoken");

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
  const { email, password } = req.body;
  users
    .findUserByCredentials(email, password)
    .then((user) => {
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
        // expiresIn: '7d' // Семь дней
        expiresIn: 3600, // один час, то есть 3600 секунд
      });
      res
        .status(200)
        .send({
          _id: user._id,
          username: user.username,
          email: user.email,
          jwt: token,
        });
    })
    .catch((error) => {
      res.status(401).send({ message: error.message });
    });
};

// Не забываем экспортирвать функцию
module.exports = { login };
