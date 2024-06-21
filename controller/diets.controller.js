const { body, validationResult } = require("express-validator");
const Diet = require("../models/diets.model");

const { options } = require("../routes/diets.route");
const { SUCCESS, FAIL, ERROR } = require("../utilities/httpStatusObject");

const getAllDiets = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const Diets = await Diet.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({
    status: SUCCESS,
    data: { Diets },
  });
};

const getSingleDiet = async (req, res) => {
  try {
    const diet = await Diet.findById(req.params.dietId);
    if (!diet) {
      return res.status(400).send({ status: FAIL, data: { Diet: null } });
    }
    res.json({
      status: SUCCESS,
      data: { diet },
    });
  } catch (err) {
    return res
      .status(404)
      .send({ status: ERROR, data: null, message: err.message, code: 404 });
  }
};

const addDiet = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: FAIL, data: { errors: errors.array() } });
  }
  const newDiet = new Diet(req.body);
  await newDiet.save();
  const data = await Diet.find();
  // res.status(201).json({ status: SUCCESS, data: { Diet: newDiet } });
  res.status(201).json(data);
};

const updateDiet = async (req, res) => {
  const dietId = req.params.dietId;

  try {
    let UpdatedDiet = await Diet.findByIdAndUpdate(dietId, {
      $set: { ...req.body },
    });

    if (!UpdatedDiet) {
      return res.status(400).send({ status: FAIL, data: { Diet: null } });
    }
    res.status(200).json(UpdatedDiet);
  } catch (err) {
    return res
      .status(404)
      .send({ status: ERROR, data: null, message: err.message, code: 404 });
  }
};

const deleteDiet = async (req, res) => {
  const dietId = req.params.dietId;
  await Diet.deleteOne({ _id: dietId });
  res.status(200).json({ status: SUCCESS });
};

module.exports = {
  getAllDiets,
  getSingleDiet,
  addDiet,
  deleteDiet,
  updateDiet,
};
