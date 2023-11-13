require('dotenv').config();

const {
  JWT_SECRET, NODE_ENV, PORT, DB_URL,
} = process.env;

module.exports = {
  JWT_SECRET, NODE_ENV, PORT, DB_URL,
};
