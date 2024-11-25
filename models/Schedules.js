const mongoose = require('mongoose');
const { formatTime } = require('../utils/functions');

const Schedules = new mongoose.Schema({
   date: {
      type: Date,
      default: Date.now,
      get: function (value) {
         const date = new Date(value);
         const options = { month: "short", day: "numeric" };
         return date.toLocaleDateString("en-US", options);
      }
   },
   shacharit: {
      type: String,
      get: function (value) {
         return formatTime(value)
      }
   },
   mincha: {
      type: String,
      get: function (value) {
         return formatTime(value)
      }
   },
   arvit: {
      type: String,
      get: function (value) {
         return formatTime(value)
      }
   }
}, { toJSON: { getters: true }, toObject: { getters: true } });

module.exports = mongoose.model('Schedules', Schedules);
