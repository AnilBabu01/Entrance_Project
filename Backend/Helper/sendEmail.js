const nodemailer = require("nodemailer");
const { config } = require("dotenv");
config();
const sendEmail = async (email, subject, htmlTemplate) => {
    try {
        // Nodemailer transporter

        console.log("end data",process.env.SMTP_USER,process.env.SMTP_PASS)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // Use TLS
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        // Email options
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: subject,
            html: htmlTemplate
        };

        // Send mail
        await transporter.sendMail(mailOptions);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        return { success: false, message: "Email sending failed", error };
    }
};

module.exports = sendEmail;
