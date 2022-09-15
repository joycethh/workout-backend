const express = require("express");
const {
  createWorkOut,
  getWorkouts,
  getAWorkout,
  deleteWorkout,
  updateWorkout,
  fetchAll,
} = require("../controllers/workoutController");
const Auth = require("../middleware/authMiddleware");

const router = express.Router();
//for example home page
router.get("/example", fetchAll);

//GET all workouts
router.get("/", Auth, getWorkouts);

//GET a single workout
router.get("/:id", Auth, getAWorkout);

//POST a new workout to create one
router.post("/", Auth, createWorkOut);

//DELETE a workout
router.delete("/:id", Auth, deleteWorkout);

router.patch("/:id", Auth, updateWorkout);

module.exports = router;
