const Schedules = require('../models/Schedules')

module.exports = {
   get,
   createMany,
   create,
   update,
   remove
}

async function get(req, res, next) {
   try {
      const schedules = await Schedules.find();
      res.json(schedules);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}

async function createMany(req, res, next) {
   const { data } = req.body;

   Schedules.insertMany(data)
      .then((d) => {
         console.log('Schedules inserted successfully');
         res.json(d);
      })
      .catch((error) => {
         console.error('Error inserting Schedules data: ', error);
         res.status(500).json({ message: 'Error inserting Schedules data' });
      });
}

async function create(req, res, next) {
   const ScheduleData = req.body;
   try {
      const newSchedule = new Schedules(ScheduleData);
      await newSchedule.save();
      res.status(201).json(newSchedule);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

async function update(req, res, next) {
   const { id } = req.params;
   const updateData = req.body;
   try {
      const updatedSchedule = await Schedules.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedSchedule) return res.status(404).json({ message: 'Schedules not found' });
      res.json(updatedSchedule);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

async function remove(req, res, next) {
   const { id } = req.params;
   try {
      const deletedSchedule = await Schedules.findByIdAndDelete(id);
      if (!deletedSchedule) return res.status(404).json({ message: 'Schedules not found' });
      res.json({ message: 'Schedules deleted successfully' });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}
