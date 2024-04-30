const mongoose = require("mongoose");

const categorySchema = require("./category");
const userSchema = require("./user");

// на практикуме указаны именно эти подлючения
// и ниже по тектсу они должны использоваться.
//До сих пор не понимаю почему
//const userModel = require('./user');
//const categoryModel = require('./category');

const gameSchema = new mongoose.Schema({
  title: {
    // Поле со строковым значением
    type: String,
    // Явно указываем, что поле обязательно при записи в базу нового документа
    required: true,
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
      ref: userSchema,
    },
  ],
  // Добавляем поле для списка категорий
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: categorySchema,
    },
  ],
});

// в место двух строк ниже можно использовать
// закомментированную ниже запись
const game = mongoose.model("game", gameSchema);
module.exports = game;

// module.exports = mongoose.model("game", gameSchema);
