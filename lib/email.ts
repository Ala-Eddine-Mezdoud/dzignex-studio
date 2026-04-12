
import nodemailer from "nodemailer";
/**
 * SMTP Email Configuration
 *
 * Uses environment variables:
 * - SMTP_HOST: SMTP server hostname (default: smtp.gmail.com)
 * - SMTP_PORT: SMTP server port (default: 465 for SSL)
 * - SMTP_USER: Email address for authentication
 * - SMTP_APP_PASS: App password for authentication
 * - SMTP_FROM_NAME: Sender name (default: Dzignex )
 */

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: nodemailer.SendMailOptions["attachments"];
}

interface SendEmailResult {
  success: boolean;
  error?: string;
}

/**
 * Create a configured nodemailer transporter
 */
function createTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASS?.replace(/\s+/g, ""); // Clean password

  if (!user || !pass) {
    throw new Error(
      "Missing SMTP configuration: SMTP_USER and SMTP_APP_PASS are required",
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Send an email using SMTP
 */
export async function sendEmail(
  options: SendEmailOptions & { category?: string; senderEmail?: string },
): Promise<SendEmailResult> {
  const fromName = process.env.SMTP_FROM_NAME || "Dzignex ";
  const fromEmail = process.env.SMTP_USER || "";

  try {
    // Log email attempt
    console.log(`Sending email to: ${options.to}, Subject: ${options.subject}`);
    const transporter = createTransporter();

    // Verify connection
    await transporter.verify();

    await transporter.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      attachments: options.attachments,
    });


    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

/**
 * Send a password reset email
 */
export async function sendPasswordResetEmail(
  email: string,
  resetLink: string,
  senderEmail?: string,
): Promise<SendEmailResult> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  const html = `
    <body style="margin:0; padding:0; background:#010110; font-family:'DM Sans', Arial, sans-serif;">
      <div style="max-width:600px; margin:auto; background:#010110; color:#ffffff; padding:40px 30px;">

        <!-- LOGO -->
        <div style="text-align:center; margin-bottom:40px;">
          <img src="${baseUrl}/dzignex_logo.svg" alt="Dzignex Studio" style="width:120px; height:auto;" />
        </div>

        <!-- TITLE -->
        <h1 style="text-align:center; color:#ffffff; font-size:36px; font-weight:700; margin:0 0 30px;">
          PASSWORD <span style="color:#0C3EFF;">RESET</span> REQUEST
        </h1>

        <!-- CONTENT -->
        <p style="font-size:16px; line-height:1.6; color:#ffffff; margin-bottom:25px; text-align:center;">
          We received a request to reset the password for your Dzignex Studio account. To proceed with the password reset, please click the secure link below.
        </p>

        <!-- CTA BUTTON -->
        <div style="text-align:center; margin:40px 0;">
          <a
            href="${resetLink}"
            style="
              display:inline-block;
              padding:16px 32px;
              background:#0C3EFF;
              color:#ffffff;
              text-decoration:none;
              font-weight:700;
              font-size:16px;
              border-radius:8px;
            "
          >
            Reset My Password
          </a>
        </div>

        <!-- EXPIRY NOTICE -->
        <p style="text-align:center; font-size:14px; line-height:1.6; color:#cccccc; margin-bottom:20px;">
          For security purposes, this link will expire in <strong>30 minutes</strong>. If you need a new reset link, please initiate another request.
        </p>

        <!-- SECURITY NOTICE -->
        <p style="text-align:center; font-size:14px; line-height:1.6; color:#cccccc; margin-bottom:50px;">
          If you did not initiate this password reset request, please disregard this email. Your account remains secure, and no action is required on your part.
        </p>

        <!-- FOOTER -->
        <div style="border-top: 1px solid #333; padding-top: 20px; text-align: center;">
          <p style="font-size:12px; color:#888888; margin:0;">
            © ${new Date().getFullYear()} Dzignex Studio. All rights reserved.
          </p>
        </div>

      </div>
    </body>
  `;

  const text = `
Password Reset Request

We received a request to reset the password for your Dzignex Studio account. To proceed with the password reset, please click the secure link below:

${resetLink}

For security purposes, this link will expire in 30 minutes. If you need a new reset link, please initiate another request.

If you did not initiate this password reset request, please disregard this email. Your account remains secure, and no action is required on your part.

© ${new Date().getFullYear()} Dzignex Studio. All rights reserved.
  `;

  return sendEmail({
    to: email,
    subject: "Password Reset Request - Dzignex Studio",
    html,
    text,
    category: "password_reset",
    senderEmail,
  });
}

/**
 * Send a magic link email for passwordless login
 */
export async function sendMagicLinkEmail(
  email: string,
  magicLink: string,
  senderEmail?: string,
): Promise<SendEmailResult> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  const html = `
    <body style="margin:0; padding:0; background:#010110; font-family:'DM Sans', Arial, sans-serif;">
      <div style="max-width:600px; margin:auto; background:#010110; color:#ffffff; padding:40px 30px;">

        <!-- LOGO -->
        <div style="text-align:center; margin-bottom:40px;">
          <img src="${baseUrl}/dzignex_logo.svg" alt="Dzignex Studio" style="width:120px; height:auto;" />
        </div>

        <!-- TITLE -->
        <h1 style="text-align:center; color:#ffffff; font-size:42px; font-weight:700; margin:0 0 30px;">
          SECURE SIGN-IN <span style="color:#0C3EFF;">LINK</span>
        </h1>

        <!-- CONTENT -->
        <p style="font-size:16px; line-height:1.6; color:#ffffff; margin-bottom:25px; text-align:center;">
          We have received a sign-in request for your Dzignex Studio account. Please use the secure magic link below to access your account without entering a password.
        </p>

        <!-- CTA BUTTON -->
        <div style="text-align:center; margin:40px 0;">
          <a
            href="${magicLink}"
            style="
              display:inline-block;
              padding:16px 32px;
              background:#0C3EFF;
              color:#ffffff;
              text-decoration:none;
              font-weight:700;
              font-size:16px;
              border-radius:8px;
            "
          >
            Sign In Securely
          </a>
        </div>

        <!-- EXPIRY NOTICE -->
        <p style="text-align:center; font-size:14px; line-height:1.6; color:#cccccc; margin-bottom:20px;">
          For your security, this link will expire in <strong>24 hours</strong> and can only be used once. After use, you will remain signed in until you explicitly sign out.
        </p>

        <!-- SECURITY NOTICE -->
        <p style="text-align:center; font-size:14px; line-height:1.6; color:#cccccc; margin-bottom:50px;">
          If you did not initiate this sign-in request, please disregard this email. Your account security has not been compromised.
        </p>

        <!-- FOOTER -->
        <div style="border-top: 1px solid #333; padding-top: 20px; text-align: center;">
          <p style="font-size:12px; color:#888888; margin:0;">
            © ${new Date().getFullYear()} Dzignex Studio. All rights reserved.
          </p>
        </div>

      </div>
    </body>
  `;

  const text = `
Secure Sign-In Link

We have received a sign-in request for your Dzignex Studio account. Please use the secure magic link below to access your account without entering a password:

${magicLink}

For your security, this link will expire in 24 hours and can only be used once. After use, you will remain signed in until you explicitly sign out.

If you did not initiate this sign-in request, please disregard this email. Your account security has not been compromised.

© ${new Date().getFullYear()} Dzignex Studio. All rights reserved.
  `;

  return sendEmail({
    to: email,
    subject: "Secure Sign-In Link - Dzignex Studio",
    html,
    text,
    category: "magic_link",
    senderEmail,
  });
}

/**
 * Send an invitation email
 */
export async function sendInviteEmail(
  email: string,
  inviteLink: string,
  senderEmail?: string,
): Promise<SendEmailResult> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  const html = `
    <body style="margin: 0; padding: 0; background: #010110; font-family: 'DM Sans', Arial, sans-serif; padding-right: 40px; padding-left: 40px">
      <div style="max-width: 600px; margin: auto; background: #010110; color: #fff; padding: 40px 30px;">
        <!-- LOGO -->
        <div style="text-align:center; margin-bottom:40px;">
          <img src="${baseUrl}/dzignex_logo.svg" alt="Dzignex Studio" style="width:120px; height:auto;" />
        </div>

        <!-- INVITE TITLE -->
        <h1 style="text-align: center; color: #fff; font-size: 48px; font-weight: 700; margin: 0; margin-bottom: 40px;">
          TEAM <span style="color: #0C3EFF;">INVITATION</span>
        </h1>

        <!-- INTRO TEXT -->
        <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 25px; text-align: center;">
          You have been extended an invitation to join the Dzignex Studio team. We are excited about the prospect of collaborating with you.
        </p>

        <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 25px; text-align: center;">
          Please accept your invitation by clicking the secure link below, where you will be guided through the account setup process.
        </p>

        <!-- CTA BUTTON -->
        <div style="text-align: center; margin: 40px 0;">
          <a
            href="${inviteLink}"
            style="
              display: inline-block;
              padding: 16px 32px;
              background: #0C3EFF;
              color: #ffffff;
              text-decoration: none;
              font-weight: 700;
              font-size: 16px;
              border-radius: 8px;
            "
          >
            Accept Invitation
          </a>
        </div>

        <!-- EXPIRY NOTICE -->
        <p style="text-align: center; font-size: 14px; line-height: 1.6; color: #cccccc; margin-bottom: 20px;">
          This invitation is valid for <strong>7 days</strong> and may only be used once. Please complete your registration within this timeframe.
        </p>

        <!-- SECURITY NOTICE -->
        <p style="text-align: center; font-size: 14px; line-height: 1.6; color: #cccccc; margin-bottom: 50px;">
          If you were not expecting this invitation, please disregard this email. No further action is required.
        </p>

        <!-- FOOTER -->
        <div style="border-top: 1px solid #333; padding-top: 20px; text-align: center;">
          <p style="font-size: 12px; color: #888888; margin: 0;">
            © ${new Date().getFullYear()} Dzignex Studio. All rights reserved.
          </p>
        </div>
      </div>
    </body>
  `;

  const text = `
Team Invitation - Dzignex Studio

You have been extended an invitation to join the Dzignex Studio team. We are excited about the prospect of collaborating with you.

Please accept your invitation by clicking the secure link below, where you will be guided through the account setup process:

${inviteLink}

This invitation is valid for 7 days and may only be used once. Please complete your registration within this timeframe.

If you were not expecting this invitation, please disregard this email. No further action is required.

© ${new Date().getFullYear()} Dzignex Studio. All rights reserved.
  `;

  return sendEmail({
    to: email,
    subject: "Team Invitation - Dzignex Studio",
    html,
    text,
    category: "invite",
    senderEmail,
  });
}

/**
 * Send a welcome email to a new user
 */
export async function sendWelcomeEmail(
  email: string,
  fullName: string,
  role: "CREATOR" | "ENABLER" = "CREATOR",
  senderEmail?: string,
): Promise<SendEmailResult> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  const html =
    role === "ENABLER"
      ? `
      <body style="margin: 0; padding: 0; background: #010110; font-family: 'DM Sans', Arial, sans-serif; padding-right: 40px;padding-left: 40px">
        <div style="max-width: 600px; margin: auto; background: #010110; color: #fff; padding: 40px 30px;">
          <!-- LOGO -->
          <div style="text-align:center; margin-bottom:40px;">
            <img src="${baseUrl}/dzignex_logo.svg" alt="Dzignex Studio" style="width:120px; height:auto;" />
          </div>

          <!-- DEAR NAME -->
          <h1 style="text-align: center; color: #fff; font-size: 48px; font-weight: 700; margin: 0; margin-bottom: 40px;">
            WELCOME TO <span style="color: #0C3EFF;">DZIGNEX STUDIO</span>
          </h1>

          <!-- INTRO TEXT -->
          <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 25px; text-align: center;">
            Thank you for registering with Dzignex Studio as an Enabler. We value your interest in partnering with us to empower the creative community.
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 25px; text-align: center;">
            Your application has been submitted successfully. Our team is reviewing your profile and will reach out within 2–3 business days to discuss how we can work together.
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 40px; text-align: center;">
            If you have any questions or would like to share additional materials, please reply to this email at your convenience.
          </p>

          <p style="font-size: 16px; color: #fff; margin-bottom: 60px; text-align: center;">
            Best regards,<br />
            <strong>The Dzignex Studio Team</strong>
          </p>

          <!-- FOOTER -->
          <div style="border-top: 1px solid #333; padding-top: 20px; text-align: center;">
            <p style="font-size: 12px; color: #888888; margin: 0;">
              © ${new Date().getFullYear()} Dzignex Studio. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    `
      : `
      <body style="margin: 0; padding: 0; background: #010110; font-family: 'DM Sans', Arial, sans-serif; padding-right: 40px;padding-left: 40px">
        <div style="max-width: 600px; margin: auto; background: #010110; color: #fff; padding: 40px 30px;">
          <!-- LOGO -->
          <div style="text-align:center; margin-bottom:40px;">
            <img src="${baseUrl}/dzignex_logo.svg" alt="Dzignex Studio" style="width:120px; height:auto;" />
          </div>

          <!-- HELLO NAME -->
          <h1 style="text-align: center; color: #fff; font-size: 48px; font-weight: 700; margin: 0; margin-bottom: 40px;">
            WELCOME TO <span style="color: #0C3EFF;">DZIGNEX STUDIO</span>
          </h1>

          <!-- INTRO TEXT -->
          <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 25px; text-align: center;">
            Welcome to Dzignex Studio. We're thrilled to have you join our community of creators and innovators.
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 25px; text-align: center;">
            Your account is now active and ready to use. Explore our platform to discover projects, connect with fellow creators, and bring your creative vision to life.
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 25px; text-align: center;">
            Whether you're here to collaborate on exciting projects or showcase your work, Dzignex Studio provides the tools and community you need to succeed.
          </p>

          <!-- OUTRO -->
          <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 40px; text-align: center;">
            If you have any questions or need assistance getting started, our team is here to help. We look forward to seeing what you'll create.
          </p>

          <p style="font-size: 16px; color: #fff; margin-bottom: 60px; text-align: center;">
            Best regards,<br />
            <strong>The Dzignex Studio Team</strong>
          </p>

          <!-- FOOTER -->
          <div style="border-top: 1px solid #333; padding-top: 20px; text-align: center;">
            <p style="font-size: 12px; color: #888888; margin: 0;">
              © ${new Date().getFullYear()} Dzignex Studio. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    `;

  const text =
    role === "ENABLER"
      ? `Welcome to Dzignex Studio

Thank you for registering with Dzignex Studio as an Enabler. We value your interest in partnering with us to empower the creative community.

Your application has been submitted successfully. Our team is reviewing your profile and will reach out within 2–3 business days to discuss how we can work together.

If you have any questions or would like to share additional materials, please reply to this email at your convenience.

Best regards,
The Dzignex Studio Team`
      : `Welcome to Dzignex Studio

Welcome to Dzignex Studio. We're thrilled to have you join our community of creators and innovators.

Your account is now active and ready to use. Explore our platform to discover projects, connect with fellow creators, and bring your creative vision to life.

Whether you're here to collaborate on exciting projects or showcase your work, Dzignex Studio provides the tools and community you need to succeed.

If you have any questions or need assistance getting started, our team is here to help. We look forward to seeing what you'll create.

Best regards,
The Dzignex Studio Team`;

  return sendEmail({
    to: email,
    subject: "Welcome to Dzignex Studio",
    html,
    text,
    category: "welcome",
    senderEmail,
  });
}