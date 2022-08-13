import nodemailer from 'nodemailer'
import "dotenv/config"

const { EMAIL_APPLICATION_KEY, EMAIL } = process.env


export const transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port:465,
  secure:true,// true for false for other ports
  auth:{
    user:EMAIL,// generated ethereal user
    pass:EMAIL_APPLICATION_KEY,// generated ethereal password
  },
})

transporter.verify().then(() => {
  console.log('ready for send emails')
})