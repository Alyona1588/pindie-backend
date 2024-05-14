const mongoose = require("mongoose");

const categorySchema = require("./category");
const userSchema = require("./user");

// на практикуме указаны именно эти подлючения
// и ниже по тектсу они должны использоваться.
//До сих пор не понимаю почему
//const userModel = require('./user');
//const categoryModel = require('./category');

const gameSchema = new mongoose.Schema({
  // Создали схему
  title: {
    // Поле со строковым значением
    type: String,
    // Явно указываем, что поле обязательно при записи в базу нового документа
    //required: true,
  },
  description: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },

  //// Добавляем свойство категории с массивом объектов, в котором укажем
  // тип ObjectId и ref на существующую модель категорий

  // Добавляем поле для списка пользователей
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: userSchema, // Содержит ссылки на связанные с игрой модели пользователей
    },
  ],
  // Добавляем поле для списка категорий
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: categorySchema, // Содержит ссылки на связанные с игрой модели категорий
    },
  ],
});

// Добавим метод для поиска игр по категории
gameSchema.statics.findGameByCategory = function (category) {
  return this.find({}) // Выполним поиск всех игр
    .populate({
      path: "categories",
      match: { name: category }, // Опция поможет сопоставить подходящие игры по выбранной категории
    })
    .populate({
      path: "users",
      select: "-password", // Позволяет получить записи о пользователях за исключением их паролей (они же хранятся в зашифрованном виде)
    })
    .then((games) => {
      // Отфильтруем по наличию искомой категории
      return games.filter((game) => game.categories.length > 0);
    });
};

// в место двух строк ниже можно использовать
// закомментированную ниже запись
const game = mongoose.model("game", gameSchema); // создали модель на основе схемы
module.exports = game; //экспортировали модель

// module.exports = mongoose.model("game", gameSchema);
