const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
require('dotenv').config();
const { gmailContent } = require('./EmailTemplate')
const secret_key = process.env.JWT_SECRET;




const generateverificationToken = (email) => {
    console.log(secret_key)
    return jwt.sign({ email: email }, secret_key, { expiresIn: '1d' })
}


const sendVerificationEmail = async (recipientEmail, verificationToken) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }

        })
        
        const emailcontent = gmailContent(verificationToken);
        console.log(process.env.EMAIL + "email this is")

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'Email Verification',
            html: emailcontent
        })

        console.log("Verification email has been sent");

    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}





module.exports = {
    generateverificationToken,
    sendVerificationEmail,
}