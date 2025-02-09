const axios = require('axios'); 

module.exports = {
   donate,
}

async function donate(req, res, next) {

   const { amount, cardNumber, expiry, cvv } = req.body;

   
   try {
     const response = await axios.post("https://secure.networkmerchants.com/api/transact.php", null, {
       params: {
         username: process.env.NMI_USERNAME,
         password: process.env.NMI_API_KEY,
         amount,
         type: "sale",
         ccnumber: cardNumber,
         ccexp: expiry,
         cvv,
       },
     });

     console.log(response);
     
 
     if (response.data.response === "1") {
       res.json({ success: true });
     } else {
       res.json({ success: false, message: response.data});
     }
   } catch (error) {
     console.error(error);
     res.status(500).json({ success: false, message: "Server error" });
   }
}