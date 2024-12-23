const mongoose = require('mongoose');

const Schedules = new mongoose.Schema({
   week: {
      type: Number,
      required: [true, '1,2,3,4 only'],
      enum: [1, 2, 3, 4]
   },
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
