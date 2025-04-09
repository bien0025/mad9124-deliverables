'use strict';
const dotenv = require('dotenv');
dotenv.config();

const express = require("express");

const connectDB = require('./models/db');

const matchRouter = require("./routers/matches");
const courtRoutes = require('./routers/courts');
const authRouter = require('./routers/auth');

const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const mongoose = require("mongoose");


const logger = require('./utils/logger');
require('./utils/passport');



connectDB();

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use("/api/matches", matchRouter);
app.use("/api/courts", courtRoutes);

app.use(notFound);          
app.use(errorHandler); 

mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log(`DUCK DUCK GOOOOSE 🦆 ✅ at ${PORT}`))
    .catch((erreur)=> console.log("ducky is hurt 😢 retry plz!",erreur));

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Server listening on port ${PORT}`);

  logger.debug(`Server running at ${PORT}`);
});
