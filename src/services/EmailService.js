import { transporter } from "../config/email.config.js";
import { RESPONSE_MESSAGES } from "../constants/responseMessages.js";


export const sendEmail = async ({ receiver, subject, htmlContent }) => {
    try {
        const mailOptions = {
            from: "Email Verification <no-reply@justhired.mern.com>",
            to: receiver,
            subject,
            html: htmlContent
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);

        return { success: true, message: RESPONSE_MESSAGES.EMAIL_VERIFICATION_SENT };
    } catch (error) {
        console.error("Error sending email:", error.message);
        return { success: false, message: RESPONSE_MESSAGES.ERROR_SENDING_EMAIL };
    }
};