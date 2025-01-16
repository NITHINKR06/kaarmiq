// import nodemailer from 'nodemailer';
// import User from "@/models/userModel";
// import bcryptjs from 'bcryptjs';

// export const sendEmail = async({email, emailType, userId}: any) => {
//     try {
//         // Create a hashed token
//         const hashedToken = await bcryptjs.hash(userId.toString(), 10);

//         // Update the user with the appropriate token
//         if (emailType === "VERIFY") {
//             await User.findByIdAndUpdate(userId, 
//                 {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000});
//         } else if (emailType === "RESET") {
//             await User.findByIdAndUpdate(userId, 
//                 {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000});
//         }

//         // Create the email transport
//         const transport = nodemailer.createTransport({
//             host: "smtp",
//             port: 2525,
//             auth: {
//                 user: process.env.SMTP_USER,
//                 pass: process.env.SMTP_PASS
//             }
//         });

//         // Email options
//         const mailOptions = {
//             from: 'kaarmiqofficial@gmail.com',
//             to: email,
//             subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
//             html: `
//                 <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>
//                 <p>Or copy and paste the link below in your browser:</p>
//                 <p><a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">${process.env.DOMAIN}/verifyemail?token=${hashedToken}</a></p>
//             `
//         };

//         // Send email
//         const mailResponse = await transport.sendMail(mailOptions);
//         return mailResponse;

//     } catch (error: any) {
//         console.error("Error occurred while sending email: ", error);
//         throw new Error(error.message);
//     }
// };
