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
      try {
         await sendEmail({
            username: first_name + ' ' + last_name,
            to: email,
            intro: 'Thank you for your generous donation.',
            subject: 'wckollel Donation Receipt',
            outro: 'No goods or services were provided in lieu of this donation.',
            table: {
               data: [
                  {
                     description: 'Amount of us dollars donated',
                     amount: '💲' + parseFloat(amount) * 100
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
         res.status(response.status).json(response.data)
      } catch (error) {
         return next(new ErrorResponse('Email could not be sent', 500))
      }
   } catch (error) {
      // console.error(error)
      if (error.response) {
         res.status(error.response.status).json({ error: error.response.data })
      } else {
         res.status(500).json({ error: "Internal server error" })
      }
   }
}
