// =======================
// emailTemplates.js
// =======================

/**
 * Base email template wrapper
 * @param {string} heading - Title shown in the email (e.g. "Welcome", "Login Verification")
 * @param {string} content - The main HTML content
 * @returns {string} - Final HTML email
 */
const baseEmailTemplate = (heading, content) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${heading}</title>
    </head>
    <body style="font-family: Arial, sans-serif; background:#f9fafb; padding:20px;">
      <table width="100%" cellspacing="0" cellpadding="0" 
        style="max-width:600px; margin:0 auto; background:#ffffff; 
               border-radius:8px; overflow:hidden; 
               box-shadow:0 4px 12px rgba(0,0,0,0.05);">
        
        <tr>
          <td style="background:#4f46e5; color:#ffffff; padding:20px; 
                     text-align:center; font-size:20px; font-weight:bold;">
            Chat App
          </td>
        </tr>
        
        <tr>
          <td style="padding:30px;">
            ${content}
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};

// -----------------------
// Verify Email
// -----------------------
export const verifyEmailTemplate = (username, verifyUrl) => {
  const content = `
    <h2 style="color:#111827;">Welcome, ${username} 👋</h2>
    <p style="color:#374151; font-size:15px;">
      Thank you for signing up. Please confirm your email address to activate your account.
    </p>
    <p style="text-align:center; margin:30px 0;">
      <a href="${verifyUrl}" 
         style="background:#4f46e5; color:#ffffff; padding:12px 24px; 
                text-decoration:none; border-radius:6px; font-weight:bold;">
        Verify Email
      </a>
    </p>
    <p style="color:#6b7280; font-size:13px;">
      This link will expire in 1 hour. If you didn’t create this account, you can ignore this email.
    </p>
  `;

  return baseEmailTemplate("Verify your email", content);
};

// -----------------------
// Login OTP
// -----------------------
export const loginOtpTemplate = (fullName, otp) => {
  const content = `
    <h2 style="color:#111827; text-align:center;">Login Verification</h2>
    <p style="color:#374151; font-size:15px; text-align:center;">
      Hello ${fullName}, use the OTP below to complete your login:
    </p>
    <h1 style="font-size:36px; letter-spacing:6px; margin:20px 0; 
               color:#4f46e5; text-align:center;">
      ${otp}
    </h1>
    <p style="color:#6b7280; font-size:13px; text-align:center;">
      This OTP will expire in 10 minutes.<br/>
      If this wasn’t you, please reset your password immediately.
    </p>
  `;

  return baseEmailTemplate("Your OTP Code", content);
};

// -----------------------
// Password Reset Success
// -----------------------
export const passwordResetSuccessTemplate = (fullName) => {
  const content = `
    <h2 style="color:#111827;">Hello, ${fullName} 👋</h2>
    <p style="color:#374151; font-size:15px;">
      Your password has been successfully updated.
    </p>
    <p style="color:#374151; font-size:15px;">
      If you did not perform this action, please contact our support team immediately to secure your account.
    </p>
    <p style="text-align:center; margin:30px 0;">
      <a href="${process.env.CLIENT_URL}/login" 
         style="background:#4f46e5; color:#ffffff; padding:12px 24px; 
                text-decoration:none; border-radius:6px; font-weight:bold;">
        Login Now
      </a>
    </p>
    <p style="color:#6b7280; font-size:13px;">
      Thank you for using Chat App 🚀
    </p>
  `;

  return baseEmailTemplate("Password Updated Successfully", content);
};
