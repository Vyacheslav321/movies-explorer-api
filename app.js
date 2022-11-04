require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errorrsHandler');

const { PORT = 3000 } = process.env;

const app = express();

// запуск helmet
app.use(helmet());
app.disable('x-powered-by');
// мидлвэр парсер
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// подключение сервера mongoose
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
// логгер request ошибок
app.use(requestLogger);
// запуск маршрутизации
app.use(router);
// логгер error ошибок
app.use(errorLogger);
// обработчик ошибок celebrate
app.use(errors());
// централизованный обработчик ошибок
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`API запущен на ${PORT} порту`);
});
