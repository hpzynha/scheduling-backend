const mongoose = require("mongoose");

const SchedulingSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  contactNumber: String,
  notification: { type: Boolean, default: false },
});

module.exports = mongoose.model("Scheduling", SchedulingSchema);