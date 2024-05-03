import nodemailer from "nodemailer";
import dotenv from "dotenv";




dotenv.config();


const sendActivationEmail = async (email, activationLink) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: 'smtp.gmail.com',
      secure: false,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      },
      tls: {
        rejectUnauthorized: false // Ignore SSL certificate validation
      }
    });

    const emailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Account Registration ',
      
      html: `<h5>Hi there,</h5>
                <p>Your Account has been created successfully.</p>
               <h1>Enjoy the service</h1>
                </div>`,
    };

    await transporter.sendMail(emailOptions);
    console.log("Email sent: " + emailOptions.to);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};


  
const sendForgotPasswordEmail = async (email, resetLink) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: 'smtp.gmail.com',
      secure: false,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      },
      tls: {
        rejectUnauthorized: false // Ignore SSL certificate validation
      }
    });

    const emailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset Request',
      html: `<h5>Hi there,</h5>
             <p>We received a request to reset your password. If this was you, click the link below to reset your password:</p>
             <a href="${resetLink}">Reset Password</a>
             <p>If you didn't request a password reset, you can ignore this email.</p>`
    };

    await transporter.sendMail(emailOptions);
    console.log("Forgot password email sent to: " + emailOptions.to);
    return true;
  } catch (error) {
    console.error("Error sending forgot password email:", error);
    return false;
  }
};

export { sendActivationEmail, sendForgotPasswordEmail };





