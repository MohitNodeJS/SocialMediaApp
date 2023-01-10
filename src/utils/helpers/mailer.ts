import nodemailer from "nodemailer"
import smtpTransport from 'nodemailer-smtp-transport'
import otp from './otp'
class NodeMailer{
    async mails(parent,args){
        const transporter = await nodemailer.createTransport(smtpTransport({
            service:'Gmail',    

            
            auth: {
              user: "riteshpathaniawins@gmail.com",
              pass: "cpgxpaenaraobuov",
            },
          }));
          const mailOption = {
            to:args.register.email,
            from: "riteshpathaniawins@gmail.com",
            subject: "node mailer OTP",
            html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to the club.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
   </div>`
          };
         await transporter.sendMail(mailOption, function (error, info) {
            if (error) {
              
               throw new Error ( 'message: MESSAGES.NOT_SENT')
                
              }
              
            } )
        //  const otp = args.system.otp
         
    }
}

export default new NodeMailer