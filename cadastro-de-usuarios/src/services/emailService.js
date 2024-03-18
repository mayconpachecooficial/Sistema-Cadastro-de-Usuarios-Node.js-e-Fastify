const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendConfirmationEmail = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Confirmação de Cadastro',
    text: 'Por favor, confirme seu cadastro clicando no link...',
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendConfirmationEmail };
