const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-error');
const { REG_EXP_EMAIL } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "Имя" - 2'],
      maxlength: [30, 'Максимальная длина поля "Имя" - 30'],
      required: [true, 'Поле "Имя" должно быть заполнено'],
    },
    email: {
      type: String,
      validate: {
        validator: (v) => REG_EXP_EMAIL.test(v),
        message: 'Некорректная почта',
      },
      unique: true,
      required: [true, 'Поле "Почта" должно быть заполнено'],
    },
    password: {
      type: String,
      required: [true, 'Поле "Пароль" должно быть заполнено'],
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError('Неправильные почта или пароль');
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
