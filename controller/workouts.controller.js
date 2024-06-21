const { body, validationResult } = require("express-validator");
const Workout = require("../models/workouts.model");

const { options } = require("../routes/workouts.route");
const { SUCCESS, FAIL, ERROR } = require("../utilities/httpStatusObject");

const getAllWorkouts = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const workouts = await Workout.find({}, { __v: false })
    .limit(limit)
    .skip(skip);
  res.json({
    status: SUCCESS,
    data: { workouts },
  });
};

const getSingleWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.workoutId);
    if (!workout) {
      return res.status(400).send({ status: FAIL, data: { Workout: null } });
    }
    res.json({
      status: SUCCESS,
      data: { workout },
    });
  } catch (err) {
    return res
      .status(404)
      .send({ status: ERROR, data: null, message: err.message, code: 404 });
  }
};

const addWorkout = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: FAIL, data: { errors: errors.array() } });
  }
  const newWorkout = new Workout(req.body);
  await newWorkout.save();
  const data = await Workout.find();
  // res.status(201).json({ status: SUCCESS, data: { Workout: newWorkout } });
  res.status(201).json(data);
};

const updateWorkout = async (req, res) => {
  const workoutId = req.params.workoutId;

  try {
    let UpdatedWorkout = await Workout.findByIdAndUpdate(workoutId, {
      $set: { ...req.body },
    });

    if (!UpdatedWorkout) {
      return res.status(400).send({ status: FAIL, data: { Workout: null } });
    }
    res.status(200).json(UpdatedWorkout);
  } catch (err) {
    return res
      .status(404)
      .send({ status: ERROR, data: null, message: err.message, code: 404 });
  }
};

const deleteWorkout = async (req, res) => {
  const workoutId = req.params.workoutId;
  await Workout.deleteOne({ _id: workoutId });
  res.status(200).json({ status: SUCCESS });
};

module.exports = {
  getAllWorkouts,
  getSingleWorkout,
  addWorkout,
  deleteWorkout,
  updateWorkout,
};
