const express = require("express");
const {
  createWorkOut,
  getWorkouts,
  getAWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const router = express.Router();

//GET all workouts
router.get("/", getWorkouts);

//GET a single workout
router.get("/:id", getAWorkout);

//POST a new workout to create one
router.post("/", createWorkOut);

//DELETE a workout
router.delete("/:id", deleteWorkout);

router.patch("/:id", updateWorkout);

module.exports = router;
