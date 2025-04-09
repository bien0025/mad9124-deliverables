'use strict';

require('dotenv/config');
const compression = require('compression');
// const cookieParser = require('cookie-parser');

const cors = require('cors');
const express = require('express');
const expressMongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require("mongoose");

const { errorHandler } = require('./middleware/errors');
const isAuthenticated = require('./middleware/isAuthenticated');
const sanitizeBody = require('./middleware/sanitizeBody');
const { connect } = require('./models/db');
const authRouter = require('./routers/auth');
const studentRouter = require('./routers/students');
const logger = require('./util/logger');
require('./util/passport');

connect();

const app = express();

app.use(
  cors({
    origin: (process.env.CORS_ALLOWLIST || '').split(','),
    // credentials: true,
  })
);

// app.use(cookieParser());
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
  app.use(compression());
}

app.use(express.json());
app.use(morgan('tiny'));
app.use(expressMongoSanitize());
app.use(sanitizeBody);
// app.use((req, res, next) => {
//   console.log(req.cookies);
//   next();
// });

app.use('/auth', authRouter);
app.use('/api/students', studentRouter);

app.use(errorHandler);

mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log(`DUCK DUCK GOOOOSE 🦆 ✅ at ${PORT}`))
    .catch((erreur)=> console.log("ducky is hurt 😢 retry plz!",erreur));

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
  if (err) {
    logger.error('Something went wrong', err);
    return;
  }
  logger.debug(`Server running at ${PORT}`);
});
