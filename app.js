const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const exphbs = require('express-handlebars');
const path = require("path");
const nodemailer = require('nodemailer');

app.path = require("path");
app.use(express.json());        //this is to accept data in json format
// app.use(express.urlencoded());  //this is basically to decode the data send through html form





// View engine setup
// app.engine('handlebars', exphbs());
app.set('view engine', 'hbs');


// Static folder
app.use(express.static(path.join(__dirname, "public")));


// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/contact.html');
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



      // var element = document.getElementById('remsg');
      // element.innerHTML = `Thank For Your Wishes, ${req.body.name}`


      // res.sendFile('./views/contact.html', {msg:'Email has been sent'});
      res.render('contact', {msg:`Thank You For Your Wishes, ${req.body.name} Ji`});
  });
  });

app.listen(8080, () => console.log('Server started...'));