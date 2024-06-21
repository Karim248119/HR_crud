require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const trainingRouter = require("./routes/trainings.route");
const workoutsRouter = require("./routes/workouts.route");
const dietRouter = require("./routes/diets.route");
const mongoose = require("mongoose");

var cors = require("cors");

const url = process.env.mongoURL;

mongoose.connect(url).then(() => {
  console.log("connected to mongoDB");
});

app.use(cors());

app.use("/api/trainings", trainingRouter);
app.use("/api/workouts", workoutsRouter);
app.use("/api/diets", dietRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.all("*", (req, res, next) => {
  return res
    .status(404)
    .send({ status: ERROR, data: null, message: "NOT AVAILABLE", code: 404 });
});
