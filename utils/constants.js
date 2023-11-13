const DEFAULT_CODE_STATUS = 500;
const CREATED_CODE_STATUS = 201;
const LOCAL_DB_URL = 'mongodb://127.0.0.1/bitfilmsdb';

const REG_EXP_LINK = /https?:\/\/(www\.)?[\w\-._~:/?#[\]@!\\$&'()\\*+,;=]+#?/;
const REG_EXP_EMAIL = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const ALOWED_CORS = [
  'https://movies.msl.nomoredomainsrocks.ru',
  'http://movies.msl.nomoredomainsrocks.ru',
];

module.exports = {
  DEFAULT_CODE_STATUS,
  CREATED_CODE_STATUS,
  REG_EXP_LINK,
  REG_EXP_EMAIL,
  DEFAULT_ALLOWED_METHODS,
  ALOWED_CORS,
  LOCAL_DB_URL,
};
