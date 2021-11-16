const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const categoriesRouter = require('./routes/api/categories');
const userRouter = require('./routes/api/user');
const transactionsRouter = require('./routes/api/transactions');
const reportsRouter = require('./routes/api/reports');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/categories', categoriesRouter);
app.use('/api/user', userRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/reports', reportsRouter);

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Not found',
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = err.message } = err;
  res.status(status).json({ status: 'error', code: status, message });
});

module.exports = app;
