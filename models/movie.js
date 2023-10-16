const mongoose = require('mongoose');
const { REG_EXP_LINK } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле "Страна создания фильма" должно быть заполнено'],
    },
    director: {
      type: String,
      required: [true, 'Поле "Режиссёр фильма" должно быть заполнено'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле "Длительность фильма" должно быть заполнено'],
    },
    year: {
      type: String,
      required: [true, 'Поле "Год выпуска фильма" должно быть заполнено'],
    },
    description: {
      type: String,
      required: [true, 'Поле "Описание фильма" должно быть заполнено'],
    },
    image: {
      type: String,
      required: [true, 'Поле "Постер к фильму" должно быть заполнено'],
      validate: {
        validator: (v) => REG_EXP_LINK.test(v),
        message: 'Некорректная ссылка',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'Поле "Трейлер фильма" должно быть заполнено'],
      validate: {
        validator: (v) => REG_EXP_LINK.test(v),
        message: 'Некорректная ссылка',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (v) => REG_EXP_LINK.test(v),
        message: 'Некорректная ссылка',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

module.exports = mongoose.model('movie', movieSchema);
