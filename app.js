const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const helmet = require('helmet');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movie');
const limiter = require('./middlewares/rateLimiterConfig');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT = 3001 } = require('./utils/app.config');
const { NODE_ENV, DB_URL } = require('./utils/app.config');
const { LOCAL_DB_URL } = require('./utils/constants');

const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const internalServerError = require('./errors/internal-server-error');

const {
  REG_EXP_EMAIL,
} = require('./utils/constants');

const app = express();
mongoose.connect(NODE_ENV === 'production' ? DB_URL : LOCAL_DB_URL);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors);
app.use(limiter);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(REG_EXP_EMAIL),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
    }),
  }),
  createUser,
);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(REG_EXP_EMAIL),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

app.use('/users', auth, userRouter);
app.use('/movies', auth, movieRouter);

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Несуществующий маршрут'));
});

app.use(errorLogger);
app.use(errors());
app.use(internalServerError);

app.listen(PORT);
