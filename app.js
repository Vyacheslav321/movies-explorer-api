const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errorrsHandler');
const { PORT, DB_URL } = require('./utils/config');

const app = express();

// запуск helmet
app.use(helmet());
app.disable('x-powered-by');
// ограничение на количество подключений
app.use(limiter);
// мидлвэр парсер
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// подключение сервера mongoose
mongoose.connect(DB_URL);
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

app.listen(PORT);
