"use strict";

const express = require("express");

const userRouter = require("./routes/users");

const app = express();


// Application level middleware here
app.use(express.json());

// Routes here
app.get("/", (_req, res) => {
  res.send("Server Running..");
});

app.use("/api/user", userRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});