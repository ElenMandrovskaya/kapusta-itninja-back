const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async data => {
  const msg = { ...data, from: 'exoticisl@gmail.com' };
  await sgMail.send(msg);
};

module.exports = sendEmail;
