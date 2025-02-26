const axios = require('axios')
const sendEmail = require('../utils/sendEmail')

module.exports = {
   donate,
}

async function donate(req, res, next) {

   const { token, amount, first_name, last_name, email } = req.body

   try {
      const response = await axios.post(
         "https://app.fluidpay.com/api/transaction",
         {
            type: "sale",
            email_receipt: true,
            amount: parseFloat(amount) * 100,
            payment_method: { token },
            billing_address: {
               first_name,
               last_name,
               email
            },
         },
         {
            headers: {
               Authorization: process.env.FLUID_API_KEY,
               "Content-Type": "application/json",
            },
         }
      )
      res.status(response.status).json(response.data)
      if(response.data.data.response==='approved'){
         try {
            await sendEmail({
               username: first_name + ' ' + last_name,
               to: email,
               intro: `
               Thank you for your generous donation! \n
               Your gift enables wckollel to continue infusing our community and our lives with meaningful Yiddishkeit.
               You make this happen through your generosity.
               May Hashem grant you much nachas, Bracha, and Hatzlacha.
               `,
               subject: 'wckollel Donation Receipt',
               outro: 'No goods or services were provided in lieu of this donation.',
               table: {
                  data: [
                     {
                        description: 'Amount of us dollars donated',
                        amount: '$' + amount
                     }
                  ],
                  columns: {
                     customWidth: {
                        amount: '15%'
                     },
                  }
               },
   
               // instructions: 'click down ⬇️ here to reset password',
               // link: resetUrl
            })
         } catch (error) {
            return next(new ErrorResponse('Email could not be sent', 500))
         }
      }
   } catch (error) {
      if (error.response) {
         res.status(error.response.status).json({ error: error.response.data })
      } else {
         res.status(500).json({ error: "Internal server error" })
      }
   }
}

const CACHE_KEY = 'donations_cache';

// async function get(req, res, next) {
//    try {
//       const cachedData = cache.get(CACHE_KEY);

//       if (cachedData) {
//          return res.json(cachedData);
//       }

//       const donations = await donations.find();

//       cache.put(CACHE_KEY, donations);

//       res.json(donations);
//    } catch (err) {
//       res.status(500).json({ message: err.message });
//    }
// }

// async function create(req, res, next) {
//    cache.del(CACHE_KEY);
//    const ScheduleData = req.body;
//    try {
//       const newSchedule = new donations(ScheduleData);
//       await newSchedule.save();
//       res.status(201).json({ message: 'Schedule deleted successfully', data: newSchedule });
//    } catch (err) {
//       res.status(400).json({ message: err.message });
//    }
// }

// async function update(req, res, next) {
//    cache.del(CACHE_KEY);
//    const { id } = req.params;
//    const updateData = req.body;
//    try {
//       const updatedSchedule = await donations.findByIdAndUpdate(id, updateData, { new: true });
//       if (!updatedSchedule) return res.status(404).json({ message: 'donations not found' });
//       res.json({ message: 'schedule updated successfully', data: updatedSchedule });
//    } catch (err) {
//       res.status(400).json({ message: err.message });
//    }
// }

// async function remove(req, res, next) {
//    cache.del(CACHE_KEY);
//    const { id } = req.params;
//    try {
//       const deletedSchedule = await donations.findByIdAndDelete(id);
//       if (!deletedSchedule) return res.status(404).json({ message: 'donations not found' });
//       res.json({ message: 'Schedule deleted successfully' });
//    } catch (err) {
//       res.status(500).json({ message: err.message });
//    }
// }
