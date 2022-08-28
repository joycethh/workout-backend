const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });

    res.status(200).json(workouts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get a single workout
const getAWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const foundWorkout = await Workout.findById(id);

    res.status(200).json(foundWorkout);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//create new workout
const createWorkOut = async (req, res) => {
  const { title, reps, load } = req.body;

  //customize our own error message insteaf of using mongoose default error mssg
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  //add doc to db
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `No workout with id: ${id}` });
  }
  const foundWorkout = await Workout.findOneAndDelete({ _id: id });
  if (!foundWorkout) {
    return res.status(400).json({ error: "No such workout found to delete" });
  }
  res.status(200).json({ mssg: "the seleted workout is deleted" });
};

//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such id " });
  }

  const foundWorkout = await Workout.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!foundWorkout) {
    return res.status(400).json({ error: "No sunch workout found to update" });
  }
  res.status(200).json(foundWorkout);
};

module.exports = {
  createWorkOut,
  getWorkouts,
  getAWorkout,
  deleteWorkout,
  updateWorkout,
};
