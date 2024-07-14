import nodemailer from "nodemailer";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";


export const sendEmail = async({email,emailType,userId}:any)=>{
    try{
        const hashedToken = await bcryptjs.hash(userId.toString(),10)
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000});
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000});
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "a9b5a12928f8c2",
              pass: "d7934ff7652e4d"
            }
        });
        const mailOptions = {
            from: 'subodh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your email" : "Reset Your Password",
            html: `<p>Click <a href="${process.env.PORT}/verifyemail?token=${hashedToken}">here</a>to ${emailType==="VERIFY"?"verify your email": "reset your password"} or cpoy paste the link below in your browser.<br> ${process.env.PORT}/verifyemail?token=${hashedToken}</p>`
        }
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse
    }catch(error:any){
        throw new Error(error.message);
    }
}