"use server";

import jwt from "jsonwebtoken";

import transporter from "@/lib/nodemailer";

export const sendVerificationMail = async (email: string) => {
  try {
    // Create verify token
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    // Create verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_URL}/auth/email-verify/${token}`;

    // Define the mail options to send
    const mailOptions = {
      from: "no-reply@verification.com",
      to: email,
      subject: "Verification Account Email",
      html: `
              <h1>Welcome!</h1>
              <p>To verify your account, you must have click in next link:</p>
              <a href="${verificationUrl}" style="color:blue;text-decoration:underline;">Verify my account</a>
              <p>This link expires at 1 hour</p>
            `,
    };

    //   send mail
    await transporter.sendMail(mailOptions);

    return {
      ok: true,
      message: "Verification email sent successfully",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error sending verification email",
      error,
    };
  }
};
