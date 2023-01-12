const express = require('express');
const bodyParser = require('body-parser');
// const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// View engine setup
// app.engine('handlebars', exphbs());
app.set('view engine', 'hbs');


// Static folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/views/contact.handlers');
  res.render('contact');
});

app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h2>Contact Details</h2>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h2>Message</h2>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'tarunianduday@gmail.com', // generated ethereal user
        pass: 'wlvylwfusenplrsq'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }

  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'tarunianduday@gmail.com', // sender address
      to: 'arjunreddyseeram87@gmail.com', // list of receivers
      subject: 'Lovely Wishes', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
  });

app.listen(8080, () => console.log('Server started...'));