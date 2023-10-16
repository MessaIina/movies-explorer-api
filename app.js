const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movie');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const iternalServerError = require('./errors/internal-server-error');

const {
  REG_EXP_EMAIL,
} = require('./utils/constants');

const { PORT = 3001, DB_URL = 'mongodb://127.0.0.1/bitfilmsdb' } = process.env;
const app = express();

mongoose.connect(DB_URL);

app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.use(cors);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().pattern(REG_EXP_EMAIL),
      password: Joi.string().required().min(6),
    }),
  }),
  createUser,
);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(REG_EXP_EMAIL),
      password: Joi.string().required().min(6),
    }),
  }),
  login,
);

app.use(auth);
app.use('/users', userRouter);
app.use('/movies', movieRouter);

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Несуществующий маршрут'));
});

app.use(errorLogger);

app.use(errors());

app.use(iternalServerError);

app.listen(PORT);
