
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
  const html = `
    <body style="margin:0; padding:0; background:#050505; font-family:Arial, sans-serif;">
      <div style="max-width:600px; margin:auto; background:#050505; color:#ffffff; padding:40px 30px;">

          <a
            href="${resetLink}"
          >
            Reset Password
          </a>
        
      </div>
    </body>
  `;

  const text = `
Reset Your Password

You requested to reset your password. Click the link below to continue:

${resetLink}

This link will expire in 30 minutes.

If you didn't request this, you can safely ignore this email.

© ${new Date().getFullYear()} Dzignex . All rights reserved.
  `;

  return sendEmail({
    to: email,
    subject: "Reset Your Password - Dzignex ",
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
  const html = `
    <body style="margin:0; padding:0; background:#050505; font-family:Arial, sans-serif;">
      <div style="max-width:600px; margin:auto; background:#050505; color:#ffffff; padding:40px 30px;">

        <!-- TITLE -->
        <h1 style="text-align:center; color:#ffffff; font-size:42px; font-weight:700; margin:0 0 30px;">
          SIGN IN TO <span style="color:#D6F224;">Dzignex </span>
        </h1>

        <!-- CONTENT -->
        <p style="font-size:16px; line-height:1.6; color:#ffffff; margin-bottom:25px; text-align:center;">
          Click the button below to securely sign in to your Dzignex  account. No password required!
        </p>

        <!-- CTA BUTTON -->
        <div style="text-align:center; margin:40px 0;">
          <a
            href="${magicLink}"
            style="
              display:inline-block;
              padding:16px 32px;
              background:#D6F224;
              color:#050505;
              text-decoration:none;
              font-weight:700;
              font-size:16px;
              border-radius:8px;
            "
          >
            Sign In to Dzignex 
          </a>
        </div>

        <!-- EXPIRY NOTICE -->
        <p style="text-align:center; font-size:14px; line-height:1.6; color:#cccccc; margin-bottom:20px;">
          This link will expire in <strong>24 hours</strong> and can only be used once.
        </p>

        <!-- SECURITY NOTICE -->
        <p style="text-align:center; font-size:14px; line-height:1.6; color:#cccccc; margin-bottom:50px;">
          If you didn't request this link, you can safely ignore this email.
        </p>

        <!-- FOOTER -->
        <div style="border-top: 1px solid #333; padding-top: 20px; text-align: center;">
          <p style="font-size:12px; color:#888888; margin:0;">
            © ${new Date().getFullYear()} Dzignex . All rights reserved.
          </p>
        </div>

      </div>
    </body>
  `;

  const text = `
Sign In to Dzignex 

Click the link below to securely sign in to your Dzignex  account:

${magicLink}

This link will expire in 24 hours and can only be used once.

If you didn't request this link, you can safely ignore this email.

© ${new Date().getFullYear()} Dzignex . All rights reserved.
  `;

  return sendEmail({
    to: email,
    subject: "Sign In to Dzignex  - Magic Link",
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
    <body style="margin: 0; padding: 0; background: #050505; font-family: Arial, sans-serif; padding-right: 40px; padding-left: 40px">
      <div style="max-width: 600px; margin: auto; background: #050505; color: #fff; padding: 40px 30px;">
        <!-- HEADER IMAGE -->
        <div style="margin-bottom: 40px; text-align: center;">
          <img 
            src="${baseUrl}/footerBg.png" 
            alt="Dzignex Studio" 
            style="width: 100%; max-width: 600px; height: auto; display: block; margin: 0 auto;" 
          />
        </div>

        <!-- INVITE TITLE -->
        <h1 style="text-align: center; color: #fff; font-size: 48px; font-weight: 700; margin: 0; margin-bottom: 40px;">
          YOU'RE <span style="color: #D6F224;">INVITED</span>
        </h1>

        <!-- INTRO TEXT -->
        <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 25px; text-align: center;">
          You've been invited to join the Dzignex Studio team. Click the button below to accept your invitation and set up your account.
        </p>

        <!-- CTA BUTTON -->
        <div style="text-align: center; margin: 40px 0;">
          <a
            href="${inviteLink}"
            style="
              display: inline-block;
              padding: 16px 32px;
              background: #D6F224;
              color: #050505;
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
          This invitation will expire in <strong>7 days</strong> and can only be used once.
        </p>

        <!-- SECURITY NOTICE -->
        <p style="text-align: center; font-size: 14px; line-height: 1.6; color: #cccccc; margin-bottom: 50px;">
          If you weren't expecting this invitation, you can safely ignore this email.
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
You're Invited to Join Dzignex Studio

You've been invited to join the Dzignex Studio team. Click the link below to accept your invitation and set up your account.

${inviteLink}

This invitation will expire in 7 days and can only be used once.

If you weren't expecting this invitation, you can safely ignore this email.

© ${new Date().getFullYear()} Dzignex Studio. All rights reserved.
  `;

  return sendEmail({
    to: email,
    subject: "You're Invited to Join Dzignex Studio",
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
      <body style="margin: 0; padding: 0; background: #050505; font-family: Arial, sans-serif; padding-right: 40px;padding-left: 40px">
        <div style="max-width: 600px; margin: auto; background: #050505; color: #fff; padding: 40px 30px;">
          <!-- HEADER IMAGE -->
          <div style="margin-bottom: 40px; text-align: center;">
            <img 
              src="${baseUrl}/images/email-header.png" 
              alt="Dzignex " 
              style="width: 100%; max-width: 600px; height: auto; display: block; margin: 0 auto;" 
            />
          </div>

          <!-- DEAR NAME -->
          <h1 style="text-align: center; color: #fff; font-size: 48px; font-weight: 700; margin: 0; margin-bottom: 40px;">
            DEAR <span style="color: #D6F224;">${fullName.toUpperCase()},</span>
          </h1>

          <!-- INTRO TEXT -->
          <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 25px;">
            Thank you for registering with Dzignex  as an Enabler. We appreciate your interest in collaborating with us and contributing to the creator ecosystem.
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 25px;">
            Your registration has been successfully received. Our team will review the details and get in touch with you within 2–3 business days to discuss alignment and possible next steps.
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 40px;">
            If you wish to share any additional information such as proposals, portfolios, or collaboration outlines, please feel free to reply directly to this email.
          </p>

          <p style="font-size: 16px; color: #fff; margin-bottom: 60px;">
            Kind regards,<br />
            <strong>Dzignex  Team</strong>
          </p>

          <!-- FOOTER IMAGE -->
          <div style="margin-top: 60px; text-align: center;">
            <img 
              src="${baseUrl}/images/email-footer.png" 
              alt="Dzignex  Footer" 
              style="width: 100%; max-width: 600px; height: auto; display: block; margin: 0 auto;" 
            />
          </div>
        </div>
      </body>
    `
      : `
      <body style="margin: 0; padding: 0; background: #050505; font-family: Arial, sans-serif; padding-right: 40px;padding-left: 40px">
        <div style="max-width: 600px; margin: auto; background: #050505; color: #fff; padding: 40px 30px;">
          <!-- HEADER IMAGE -->
          <div style="margin-bottom: 40px; text-align: center;">
            <img 
              src="${baseUrl}/images/email-header.png" 
              alt="Dzignex  Creator Hub" 
              style="width: 100%; max-width: 600px; height: auto; display: block; margin: 0 auto;" 
            />
          </div>

          <!-- HELLO NAME -->
          <h1 style="text-align: center; color: #fff; font-size: 48px; font-weight: 700; margin: 0; margin-bottom: 40px;">
            HELLO <span style="color: #D6F224;">${fullName.toUpperCase()},</span>
          </h1>

          <!-- INTRO TEXT -->
          <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 25px;">
            Welcome to your creator journey. You're now part of a community designed to support your growth, your voice, and your craft.
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 25px;">
            Your experience inside Dzignex  begins with three pillars Connect, Create, Learn:
          </p>

          <!-- PILLARS -->
          <div style="display: flex; align-items: center; justify-items: center; margin-bottom: 20px; gap: 10px;">
            <p style="font-size: 16px; margin: 0; font-weight: 700;">
              <span style="color: #D6F224;">X</span> <span style="color: #ffffff;">COLLAB | </span>
            </p>
            <div style="width: 20px;"></div>
            <p style="font-size: 16px; color: #fff; margin: 0;">Connect with the community.</p>
          </div>

          <div style="display: flex; align-items: center; justify-items: center; margin-bottom: 20px; gap: 10px;">
            <p style="font-size: 16px; margin: 0; font-weight: 700;">
              <span style="color: #D6F224;">X</span> <span style="color: #ffffff;">CREATE | </span>
            </p>
            <div style="width: 20px;"></div>
            <p style="font-size: 16px; color: #fff; margin: 0;">Bring your ideas to life in our studios and labs.</p>
          </div>

          <div style="display: flex; align-items: center; justify-items: center; margin-bottom: 30px; gap: 10px;">
            <p style="font-size: 16px; margin: 0; font-weight: 700;">
              <span style="color: #D6F224;">X</span> <span style="color: #ffffff;">SKOOL | </span>
            </p>
            <div style="width: 20px;"></div>
            <p style="font-size: 16px; color: #fff; margin: 0;">Connect with the community.</p>
          </div>

          <!-- OUTRO -->
          <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 40px;">
            We're excited to see how your creativity evolves and how you'll shape the Dzignex  community along the way.
          </p>

          <p style="font-size: 16px; color: #fff; margin-bottom: 60px;">
            Kind regards,<br />
            <strong>Dzignex  Team</strong>
          </p>

          <!-- FOOTER IMAGE -->
          <div style="margin-top: 60px; text-align: center;">
            <img 
              src="${baseUrl}/images/email-footer.png" 
              alt="Dzignex  Footer" 
              style="width: 100%; max-width: 600px; height: auto; display: block; margin: 0 auto;" 
            />
          </div>
        </div>
      </body>
    `;

  const text =
    role === "ENABLER"
      ? `Dear ${fullName},

Thank you for registering with Dzignex  as an Enabler. We appreciate your interest in collaborating with us and contributing to the creator ecosystem.

Your registration has been successfully received. Our team will review the details and get in touch with you within 2–3 business days to discuss alignment and possible next steps.

If you wish to share any additional information such as proposals, portfolios, or collaboration outlines, please feel free to reply directly to this email.

Kind regards,
Dzignex  Team`
      : `Hello ${fullName},

Welcome to your creator journey. You're now part of a community designed to support your growth, your voice, and your craft.

Your experience inside Dzignex  begins with three pillars Connect, Create, Learn:

X COLLAB | Connect with the community.
X CREATE | Bring your ideas to life in our studios and labs.
X SKOOL | Connect with the community.

We're excited to see how your creativity evolves and how you'll shape the Dzignex  community along the way.

Kind regards,
Dzignex  Team`;

  return sendEmail({
    to: email,
    subject: "Welcome to Dzignex  🎉",
    html,
    text,
    category: "welcome",
    senderEmail,
  });
}