// models/user.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

// Метод на входе получает почту и пароль,
// а на выходе выдает результат соответтсвия в БД
userSchema.statics.findUserByCredentials = function (email, password) {
  console.log("Запуск метода userSchema.statics.findUserByCredentials");

  // Попытаемся найти пользователя по почте
  return this.findOne({ email }) // this — это модель users
    .then((user) => {
      if (!user) {
        // Не нашёлся — отклоняем промис
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }
      // Нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Неправильные почта или пароль"));
        }

        return user; // Теперь user доступен
      });
    });
};

module.exports = mongoose.model("user", userSchema);

// Мой предыдущий рабочий код
//
// const user = mongoose.model("user", userSchema);
// module.exports = user;
