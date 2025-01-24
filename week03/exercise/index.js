'use strict';

const express = require("express");
const cars = require("./cars.js");
const app = express();

app.use(express.json());

app.get("/api/cars", (req, res) => {
  res.status(200).json({ data: cars });
});

app.get("/api/cars/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  const car = cars.find((c) => c.id === carId);
  if (!car) {
    return res.status(404).json({ error: `Car with id ${carId} not found` });
  }
  res.status(200).json({ data: car });
});

app.post("/api/cars", (req, res) => {
  const newCar = { ...req.body, id: Date.now() };
  cars.push(newCar);
  res.status(201).json({ data: newCar });
});

app.patch("/api/cars/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  const car = cars.find((c) => c.id === carId);
  if (!car) {
    return res.status(404).json({ error: `Car with id ${carId} not found` });
  }
  Object.assign(car, req.body);
  res.status(200).json({ data: car });
});

app.put("/api/cars/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  const carIndex = cars.findIndex((c) => c.id === carId);
  if (carIndex === -1) {
    return res.status(404).json({ error: `Car with id ${carId} not found` });
  }
  cars[carIndex] = { ...req.body, id: carId };
  res.status(200).json({ data: cars[carIndex] });
});

app.delete("/api/cars/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  const carIndex = cars.findIndex((c) => c.id === carId);
  if (carIndex === -1) {
    return res.status(404).json({ error: `Car with id ${carId} not found` });
  }
  const deletedCar = cars.splice(carIndex, 1);
  res.status(200).json({ data: deletedCar });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
