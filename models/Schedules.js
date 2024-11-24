const mongoose = require('mongoose');

const Schedules = new mongoose.Schema({
   date: {
      type: Date,
      default: Date.now,
   },
   shacharit: {
      type: String,
   },
   mincha: {
      type: String,
   },
   arvit: {
      type: String,

   },
   // shiurim: [
   //    {
   //       title: {
   //          type: String,
   //       },
   //       time: {
   //          type: Date,
   //       },
   //       teacher: {
   //          type: String,
   //       },
   //       content: {
   //          type: String,
   //       },
   //    }
   // ]

});

module.exports = mongoose.model('Schedules', Schedules);
