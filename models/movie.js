const mongoose = require('mongoose');
const { REG_EXP_LINK } = require('../utils/constants');

const MovieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле "Страна создания" должно быть заполнено'],
    },
    director: {
      type: String,
      required: [true, 'Поле "Режисёр" должно быть заполнено'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле "Длительность" должно быть заполнено'],
    },
    year: {
      type: String,
      required: [true, 'Поле "Год выпуска" должно быть заполнено'],
    },
    description: {
      type: String,
      required: [true, 'Поле "Описание" должно быть заполнено'],
    },
    image: {
      type: String,
      validate: {
        validator: (v) => REG_EXP_LINK.test(v),
        message: 'Некорректная ссылка',
      },
      required: [true, 'Поле "Ссылка на постер" должно быть заполнено'],
    },
    trailerLink: {
      type: String,
      validate: {
        validator: (v) => REG_EXP_LINK.test(v),
        message: 'Некорректная ссылка',
      },
      required: [true, 'Поле "Ссылка на трейлер" должно быть заполнено'],
    },
    thumbnail: {
      type: String,
      validate: {
        validator: (v) => REG_EXP_LINK.test(v),
        message: 'Некорректная ссылка',
      },
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', MovieSchema);
