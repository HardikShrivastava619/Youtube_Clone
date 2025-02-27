import nodeMailer from 'nodemailer'



export const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: "hardikShrivastava93@gmail.com",
      pass: "lhvj bqdx zdqg szck",
    },
  });
