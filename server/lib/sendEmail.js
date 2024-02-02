const FormData = require('form-data');
const Mailgun = require('mailgun.js');
const { isDev } = require('#utils/commons.js');
const { MG_KEY, MG_DOMAIN } = process.env;

const sendEmail = async (data) => {
  
  if(isDev) return console.log(data)

  try {
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({username: 'api', key: MG_KEY});

    const msg = await mg.messages.create(MG_DOMAIN, data);

    return msg;

  } catch (error) {
    console.log(error)
    return;
  }
}

module.exports = sendEmail;