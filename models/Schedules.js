const mongoose = require('mongoose');

const Schedules = new mongoose.Schema({
   date: {
      type: Date,
      required: true,
   },
   time_frame: {
      type: String,
      required: true,
   },
   event_location_1: {
      type: String,
   },
   event_location_2: {
      type: String,
   },
   event_location_3: {
      type: String,
   },
   event_location_4: {
      type: String,
   },
   event_location_5: {
      type: String,
   },
})

module.exports = mongoose.model('Schedules', Schedules);
