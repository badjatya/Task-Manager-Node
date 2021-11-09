const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.EMAIL_GRID_API_KEY);

const welcomeEmail = (name, email) => {
  sgMail.send({
    to: email, // Change to your recipient
    from: "architj240@gmail.com", // Change to your verified sender
    subject: "Welcome email from task-manager-application",
    text: `We welcome you, ${name}. Thanks for registering`,
  });
};

const removeEmail = (name, email) => {
  sgMail.send({
    to: email, // Change to your recipient
    from: "architj240@gmail.com", // Change to your verified sender
    subject: `Thanks ${name} from task-manager-application`,
    text: `Come back soon ${name}. `,
  });
};

module.exports = {
  welcomeEmail,
  removeEmail,
};
