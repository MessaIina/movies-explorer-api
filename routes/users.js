const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { REG_EXP_EMAIL } = require('../utils/constants');
const {
  getUsers,
  getUserById,
  updateUser,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUserById);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().pattern(REG_EXP_EMAIL),
    }),
  }),
  updateUser,
);

module.exports = router;
