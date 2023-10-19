const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

const REG_EXP_LINK = /https?:\/\/(www\.)?[\w\-._~:/?#[\]@!\\$&'()\\*+,;=]+#?/;
const REG_EXP_EMAIL = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const REG_EXP_IMG = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,6}([-a-zA-Z0-9@:%_+.~#?&//=]*)\.(jpg|jpeg|png|bmp)$/;
const REG_EXP_VID = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,6}([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
const REG_EXP_DATE = /^\d{4}$/;

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const ALOWED_CORS = [
  'https://movies.msl.nomoredomainsrocks.ru',
  'http://movies.msl.nomoredomainsrocks.ru',
];

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  REG_EXP_LINK,
  REG_EXP_EMAIL,
  REG_EXP_IMG,
  REG_EXP_VID,
  REG_EXP_DATE,
  DEFAULT_ALLOWED_METHODS,
  ALOWED_CORS,
};
