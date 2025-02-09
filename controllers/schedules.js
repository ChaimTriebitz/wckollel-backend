const cache = require('memory-cache');
const Schedules = require('../models/Schedules')

module.exports = {
   get,
   createMany,
   create,
   update,
   remove
}

const CACHE_KEY = 'schedules_cache';

async function get(req, res, next) {
   try {
      const cachedData = cache.get(CACHE_KEY);

      if (cachedData) {
         return res.json(cachedData);
      }

      const schedules = await Schedules.find();

      cache.put(CACHE_KEY, schedules);

      res.json(schedules);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}

async function createMany(req, res, next) {
   const { data } = req.body;

   Schedules.insertMany(data)
      .then((d) => {
         // console.log('Schedules inserted successfully');
         res.json(d);
      })
      .catch((error) => {
         console.error('Error inserting Schedules data: ', error);
         res.status(500).json({ message: 'Error inserting Schedules data' });
      });
}

async function create(req, res, next) {
   cache.del(CACHE_KEY);
   const ScheduleData = req.body;
   try {
      const newSchedule = new Schedules(ScheduleData);
      await newSchedule.save();
      res.status(201).json({ message: 'Schedule deleted successfully', data: newSchedule });
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

async function update(req, res, next) {
   cache.del(CACHE_KEY);
   const { id } = req.params;
   const updateData = req.body;
   try {
      const updatedSchedule = await Schedules.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedSchedule) return res.status(404).json({ message: 'Schedules not found' });
      res.json({ message: 'schedule updated successfully', data: updatedSchedule });
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

async function remove(req, res, next) {
   cache.del(CACHE_KEY);
   const { id } = req.params;
   try {
      const deletedSchedule = await Schedules.findByIdAndDelete(id);
      if (!deletedSchedule) return res.status(404).json({ message: 'Schedules not found' });
      res.json({ message: 'Schedule deleted successfully' });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}
