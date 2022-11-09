const {
  NODE_ENV, PORT_ENV, JWT_SECRET, MONGOOSE_DB_URL,
} = process.env;

const PORT = NODE_ENV === 'production' ? PORT_ENV : 3000;
const JWT_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'pkuvqwongbqpoiqoufnvsvybqp';
const DB_URL = NODE_ENV === 'production' ? MONGOOSE_DB_URL : 'mongodb://localhost:27017/moviesdb';

module.exports = { PORT, JWT_KEY, DB_URL };
