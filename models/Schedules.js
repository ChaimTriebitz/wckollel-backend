const mongoose = require('mongoose');

const Schedules = new mongoose.Schema({
   day: {
      type: String,
      enum: [
         'sunday',
         'monday',
         'tuesday',
         'wednesday',
         'thursday',
         'friday',
         'saturday'
      ],
   },
   shacharit: {
      type: Date,
   },

});

module.exports = mongoose.model('Schedules', Schedules);
