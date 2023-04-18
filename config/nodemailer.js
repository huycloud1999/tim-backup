import nodemailer from "nodemailer";

const email = process.env.MAIL_SENDER
console.log("🚀 ~ file: nodemailer.js:4 ~ email:", email)
const pass = process.env.MAIL_PASSWORD//'cwwrhcmrhlqflhpe'//process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass,
    },
});

export const mailOptions = {
    from: email,
    to: String(process.env.MAIL_RECEIVER).split(',')
};