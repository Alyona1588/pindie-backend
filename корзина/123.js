// models/user.js

userSchema.statics.findUserByCredentials = function (email, password) {
  // Попытаемся найти пользователя по почте
  return this.findOne({ email }) // this — это модель users
    .then((user) => {
      if (!user) {
        // Не нашёлся — отклоняем промис
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }

      // Нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        // Отклоняем промис
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }

      return user; // Но переменной user нет в этой области видимости
    });
};

module.exports = mongoose.model("user", userSchema);
