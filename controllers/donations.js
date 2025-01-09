const axios = require('axios'); 

module.exports = {
   donate,
}

async function donate(req, res, next) {


   const data = req.body;
   console.log(data);

   
   
   try {

      const encodedParams = new URLSearchParams();
      encodedParams.set('type', 'sale'); // Sale transaction
      encodedParams.set('amount', data.amount); // Donation amount
      encodedParams.set('security_key', process.env.NMI_CHECK_OUT_KEY); // Replace with your actual NMI security key
      encodedParams.set('token', data.token); // Token from Collect.js
      encodedParams.set('firstname', data.firstname); // Donor's first name
      encodedParams.set('lastname', data.lastname); // Donor's last name
      
      const options = {
        method: 'POST',
        url: 'https://secure.nmi.com/api/transact.php',
        headers: {

          accept: 'application/x-www-form-urlencoded',
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: encodedParams,
      };
      
     const response = await axios.request(options)
      res.status(201).json({ message: 'Donation accepted successfully', data: response.data.data });
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}