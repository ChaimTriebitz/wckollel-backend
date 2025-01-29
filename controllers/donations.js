const axios = require('axios');

module.exports = {
   donate,
}


async function donate(req, res, next) {
   console.log(req.body);
   
   const { token, amount, name, email } = req.body;
console.log(name);

   try {
      const response = await axios.post(
         "https://app.fluidpay.com/api/transaction",
         {
            type: "sale",
            amount,
            payment_method: { token },
            billing_address: { name, email },
         },
         {
            headers: {
               Authorization: process.env.FLUID_API_KEY, // Use your server-side API key
               "Content-Type": "application/json",
            },
         }
      );

      res.status(response.status).json(response.data); // Forward the response back to the client
   } catch (error) {
      // console.error(error);
      // Check if the error is an Axios error and include more details
      if (error.response) {
         res.status(error.response.status).json({ error: error.response.data });
      } else {
         res.status(500).json({ error: "Internal server error" });
      }
   }
}
