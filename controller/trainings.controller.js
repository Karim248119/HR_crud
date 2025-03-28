const { body, validationResult } = require("express-validator");
const Training = require("../models/trainings.model");

const { options } = require("../routes/trainings.route");
const { SUCCESS, FAIL, ERROR } = require("../utilities/httpStatusObject");

const getAllTrainings = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const trainings = await Training.find({}, { __v: false })
    .limit(limit)
    .skip(skip);
  res.json({
    status: SUCCESS,
    data: { trainings },
  });
};

const getSingleTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.trainingId);
    if (!training) {
      return res.status(400).send({ status: FAIL, data: { training: null } });
    }
    res.json({
      status: SUCCESS,
      data: { training },
    });
  } catch (err) {
    return res
      .status(404)
      .send({ status: ERROR, data: null, message: err.message, code: 404 });
  }
};

//get training by name

const getTrainingByName = async (req, res) => {
  try {
    const { trainingName } = req.params;
    const { equipment, exercise } = req.query;

    const training = await Training.findOne({ name: trainingName });

    if (!training) {
      return res.status(400).send({ status: FAIL, data: { training: null } });
    }

    // Filter trainings array based on query params
    let filteredTrainings = training.trainings;

    if (exercise) {
      filteredTrainings = filteredTrainings.filter((t) =>
        t.name.toLowerCase().includes(exercise.toLowerCase())
      );
    }

    if (equipment) {
      filteredTrainings = filteredTrainings.filter((t) =>
        t.equipment.some((eq) =>
          eq.toLowerCase().includes(equipment.toLowerCase())
        )
      );
    }

    res.json({
      status: SUCCESS,
      data: {
        _id: training._id,
        name: training.name,
        img: training.img,
        bg: training.bg,
        trainings: filteredTrainings,
      },
    });
  } catch (err) {
    return res
      .status(404)
      .send({ status: ERROR, data: null, message: err.message, code: 404 });
  }
};

const addTraining = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: FAIL, data: { errors: errors.array() } });
  }
  const newTraining = new Training(req.body);
  await newTraining.save();
  const data = await Training.find();
  // res.status(201).json({ status: SUCCESS, data: { training: newTraining } });
  res.status(201).json(data);
};

const updateTraining = async (req, res) => {
  const trainingId = req.params.trainingId;

  try {
    let UpdatedTraining = await Training.findByIdAndUpdate(trainingId, {
      $set: { ...req.body },
    });

    if (!UpdatedTraining) {
      return res.status(400).send({ status: FAIL, data: { training: null } });
    }
    res.status(200).json(UpdatedTraining);
  } catch (err) {
    return res
      .status(404)
      .send({ status: ERROR, data: null, message: err.message, code: 404 });
  }
};

const deleteTraining = async (req, res) => {
  const trainingId = req.params.trainingId;
  await Training.deleteOne({ _id: trainingId });
  res.status(200).json({ status: SUCCESS });
};

//add exercises

const addExercises = async (req, res) => {
  const trainingId = req.params.trainingId;
  try {
    let training = await Training.findById(trainingId);
    if (!training) {
      return res.status(400).send({ status: FAIL, data: { training: null } });
    }
    training.trainings.push(...req.body);
    await training.save();
    res.status(201).json(training);
  } catch (err) {
    return res
      .status(404)
      .send({ status: ERROR, data: null, message: err.message, code: 404 });
  }
};

module.exports = {
  getAllTrainings,
  getSingleTraining,
  addTraining,
  deleteTraining,
  updateTraining,
  getTrainingByName,
  addExercises,
};
