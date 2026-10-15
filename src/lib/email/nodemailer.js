import nodemailer from 'nodemailer';

import { env } from '../config/env.js';

 const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
    service: 'gmail',
    auth: {
      user:env.nodemailer.user,
        pass:env.nodemailer.password
    }
});

export async function sendEmail(to, subject, text) {
   
await transporter.sendMail({
    from: Process.env.USER_MAIL,
    to: to,
    subject: subject,
    text: text
});
}