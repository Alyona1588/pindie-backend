const mongoose = require("mongoose");

const category = require("./category");
//const categoryModel = require("./category");
const user = require("./user");

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
      ref: user,
    },
  ],
  // Добавляем поле для списка категорий
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: category,
    },
  ],
});

const game = mongoose.model("game", gameSchema);

module.exports = game;

// module.exports = mongoose.model("game", gameSchema);
