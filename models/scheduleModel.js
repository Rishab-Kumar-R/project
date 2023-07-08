const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  name: String,
  date: Date,
  time: String,
  location: String,
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
