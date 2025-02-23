
const app = require("express");
const carRouter = require("./routers/cars.js");

const app = express();
app.use(express.json());

app.use("/api/cars", carRouter);

// this is a handy way to respond with status 404
// for any requests that do not match our defined routes.
app.use("*", (_req, res) => {
  res.status(404).json({
    error: {
      message: "404 | Not found",
    },
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});