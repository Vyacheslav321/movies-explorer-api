const {
  NODE_ENV, PORT_ENV, JWT_SECRET, MONGOOSE_DB_URL,
} = process.env;
console.log(process.env);
const PORT = PORT_ENV || 3000;
const JWT_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'pkuvqwongbqpoiqoufnvsvybqp';
const DB_URL = MONGOOSE_DB_URL || 'mongodb://localhost:27017/bitfilmsdb';

module.exports = { PORT, JWT_KEY, DB_URL };
