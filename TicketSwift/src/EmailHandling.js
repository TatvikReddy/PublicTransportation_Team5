const nodemailer = require('nodemailer');

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
function sendEmail(to, subject, text) {
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

// Example usage
const userToEmail = 'johnsworkatutd@gmail.com'; // User's email address
const feedbackSubject = 'Feedback for our service';
const feedbackText = 'We would love to hear your feedback on our service. Please reply to this email with your thoughts and concerns.';
const changeEmailSubject = "Change email request";
const changeEmailText = "Please reply with your new email."

sendEmail(userToEmail, feedbackSubject, feedbackText);
sendEmail(userToEmail, changeEmailSubject, changeEmailText);