const nodemailer = require('nodemailer'); //npm install nodemailer
const { send } = require('process');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: "ticketswiftofficial@gmail.com", //Ticket Swift email address (enable two factor authentication and generate an app password for this email address)
      pass: "hnlw tfkn uppv zbys", //Go to security --> set up two factor authentication --> app passwords --> generate app password
    },
  });

// Function to send email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    console.log('Sending email to:', mailOptions);

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { sendEmail }
// Example usage
//const userToEmail = {user}; // User's email address~