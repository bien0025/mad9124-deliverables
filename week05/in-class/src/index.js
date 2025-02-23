'use strict';

const express = require('express');
const morgan = require('morgan');

const studentRouter = require('./routers/students');

const app = express();

app.use(express.json());

app.use(morgan('tiny'));

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/students', studentRouter);
app.get('/tim', (req, res) => {
  res.json({ hello: 'tim1' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
  if (err) {
    console.error('Something went wrong', err);
    return;
  }
  console.log(`Server running at ${PORT}`);
});
