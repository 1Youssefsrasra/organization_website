const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: 587,
    secure: true,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  });
};

const sendEmail = (from, to, subject, html) => {
  const transporter = createTransporter();

  const message = {
    from: from,
    to: to,
    subject: subject,
    html: html,
  };

  transporter.sendMail(message, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

const loadTemplate = (filePath, callback) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading email template:", err);
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const compileAndSendEmail = (fullname, email, message) => {
  const filePath = path.join(__dirname, "../views/email.handlebars");

  loadTemplate(filePath, (err, templateData) => {
    if (err) {
      return;
    } else {
      const template = handlebars.compile(templateData);
      const html = template({
        fullname,
        email,
        message,
      });

      sendEmail(
        email,
        process.env.MAILER_USER,
        `Nouveau Message de ${fullname}`,
        html
      );
    }
  });
};

exports.compileAndSendEmail = compileAndSendEmail;
