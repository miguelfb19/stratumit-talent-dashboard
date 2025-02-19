"use server";

import jwt from "jsonwebtoken";

import transporter from "@/lib/nodemailer";

export const sendVerificationMail = async (email: string) => {
  try {
    // Create verify token
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    // Create verification URL
    const verificationUrl = `${baseUrl}/auth/email-verify/${token}`;

    // Define the mail options to send
    const mailOptions = {
      from: process.env.GMAIL_ADDRESS,
      to: email,
      subject: "Verify your email address",
      html: `
              <head>
                <style>
                  body {
                    font-family: sans-serif;
                  }
                  h1 {
                    color: #2563eb;
                  }
                </style>
              </head>
              <body>
                <h1>Welcome!</h1>
                <p>
                  Thanks for signing up on Talent Funnel! Please verify your email address by
                  clicking the link below:
                </p>
                <br />
                <p>To verify your account, you must have click in next link:</p>
                <a href="${verificationUrl}" style="color: blue; text-decoration: underline"
                  >Verify my account</a
                >
                <p>This link expires at 1 hour</p>
              </body>

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
