const mongoose = require('mongoose');

const Schedules = new mongoose.Schema({
   date: {
      type: String,
   },
   shacharit: {
      type: String,
   },
   mincha: {
      type: String,
   },
   arvit: {
      type: String,
   }
})

module.exports = mongoose.model('Schedules', Schedules);
