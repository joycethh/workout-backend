require("dotenv").config();

const express = require("express");
const mongose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

//express app
const app = express();

//global middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

//for deployment
app.get("/", (req, res) => {
  res.send("WORKOUT APP IS RUNNING.");
});

//connect to db
mongose
  .connect(process.env.MONGDB_URI)
  .then(() => {
    //listen for request
    app.listen(process.env.PORT, () =>
      console.log("connected to DB & server is listening on port 4000")
    );
  })
  .catch((err) => {
    console.log(err);
  });
