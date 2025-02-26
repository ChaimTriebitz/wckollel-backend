const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')

module.exports = sendEmail = (options) => {
   const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
         user: process.env.EMAIL_USERNAME,
         pass: process.env.EMAIL_PASSWORD
      }
   })

   const MailGen = new Mailgen({
      theme: 'default',
      product: {
         name: 'wckollel',
         link: 'https://www.wckollel.com',
         logo:'https://www.wckollel.com/static/media/wckollel-log.b4af26c26fac79625d08.png',
         logoHeight: '150px'
      }
   })

   const email = MailGen.generate(
      {
         body: {
            name: options.username,
            intro:options.intro,
            table:options.table,
            // action: {
            //    instructions: options.instructions,
            //    button: {
            //       color: '#30475E', 
            //       text: 'Click here',
            //       link: options.link,
            //    }
            // },
            outro: options.outro
         }
      }
   )

   const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: email,
   }

   transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      // else console.log(info)
   })
}

