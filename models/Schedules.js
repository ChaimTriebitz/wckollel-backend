const mongoose = require('mongoose');

const Schedules = new mongoose.Schema({
   time_frame: {
      type: String,
      required: true,
   },
   sunday: {
      type: String,
   },
   monday: {
      type: String,
   },
   tuesday: {
      type: String,
   },
   wednesday: {
      type: String,
   },
   thursday: {
      type: String,
   },
   friday: {
      type: String,
   },
   saturday: {
      type: String,
   },
})

module.exports = mongoose.model('Schedules', Schedules);
