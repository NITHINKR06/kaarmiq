import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',  // Or use your email provider's SMTP server
  auth: {
    user: process.env.EMAIL_USER,  // Email address
    pass: process.env.EMAIL_PASS,  // App password or email password
  },
});

export async function sendEmail(email: string, subject: string, text: string): Promise<void> {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,  // Sender's email address
      to: email,  // Recipient's email address
      subject: subject,
      text: text,
      html: `<p>${text}</p>`, // Optional HTML body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;  // Rethrow the error for further handling
  }
}
