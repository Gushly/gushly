const mailgun = require("mailgun-js");
// const DOMAIN = 'sandboxc0b9e4613f1d485b8ba5d45b2c4dfeef.mailgun.org';
const DOMAIN = 'gushly.satyambnsal.com'
// const api_key = "aa8656063f73b1ca0f3518f9610f9338-7fba8a4e-126fecfa"
const api_key = "6790eb77c3da432229d9e3078454bfbe-156db0f1-05b5cc7c"
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });


export default async function handler(req, res) {
  console.log("send mail")
  // const { email, subject, message, name } = req.body;
  const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'satyamsgsits1994@gmail.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!'
  };
  try {
    const response = await mg.messages().send(data);
    console.log(response);
    res.json({ message: `Email has been sent` })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message })
  }
}