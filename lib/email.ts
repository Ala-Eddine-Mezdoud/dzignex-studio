
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
    // Serverless has a hard execution ceiling, so fail fast and surface a real
    // error rather than hanging until the platform kills the instance.
    connectionTimeout: 7_000,
    greetingTimeout: 5_000,
    socketTimeout: 7_000,
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

    // No transporter.verify() here: it opens a second full connection and
    // handshake before every send, roughly doubling the time to deliver. It
    // proves nothing sendMail won't report on its own.
    const info = await transporter.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      attachments: options.attachments,
    });

    console.log(`Email accepted for delivery: ${info.messageId}`);

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

/**
 * Notify the studio inbox that a new contact form submission came in.
 *
 * Designed to be read on a phone in ten seconds: who it is, what they want,
 * what they'll spend — then reply / WhatsApp straight from the message.
 * Table-based and fully inline-styled so it survives Gmail, Outlook and Apple
 * Mail; every visitor-supplied value is HTML-escaped before it lands in markup.
 */
export async function sendContactNotificationEmail(submission: {
  fullName: string;
  email: string;
  whatsappNumber: string;
  companyName: string;
  industry: string;
  serviceRequired: string[];
  websiteOrInstagram?: string;
  budgetRange?: string;
  challenges?: string[];
  mainGoal?: string[];
  message?: string;
  reference?: string;
}): Promise<SendEmailResult> {
  const notifyTo =
    process.env.CONTACT_NOTIFICATION_EMAIL ||
    process.env.SMTP_USER ||
    "dzignex.studio@gmail.com";

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.dzignex.studio";

  const BLUE = "#0C3EFF";
  const INK = "#010110";
  const CARD = "#07071c";
  const LINE = "#1c1c3a";
  const MUTED = "#8b8fae";

  const esc = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const submittedAt = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: process.env.STUDIO_TIMEZONE || "Africa/Algiers",
  }).format(new Date());

  const firstName = submission.fullName.trim().split(/\s+/)[0] || "there";
  const waDigits = submission.whatsappNumber.replace(/\D/g, "");
  const services = submission.serviceRequired ?? [];
  const challenges = submission.challenges ?? [];
  const goals = submission.mainGoal ?? [];

  const replyHref = `mailto:${encodeURIComponent(submission.email)}?subject=${encodeURIComponent(
    `Re: your brief for ${submission.companyName} — Dzignex Studio`,
  )}&body=${encodeURIComponent(`Hi ${firstName},\n\nThanks for your brief — `)}`;

  /** Visitor text that may be a URL, rendered as a link only when it looks like one. */
  const linkify = (value: string) => {
    const trimmed = value.trim();
    if (/^https?:\/\/\S+$/i.test(trimmed) || /^www\.\S+$/i.test(trimmed)) {
      const href = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
      return `<a href="${esc(href)}" style="color:${BLUE}; text-decoration:none; border-bottom:1px solid ${LINE};">${esc(trimmed)}</a>`;
    }
    return esc(trimmed);
  };

  const chips = (values: string[]) =>
    values
      .map(
        (value) =>
          `<span style="display:inline-block; margin:0 6px 6px 0; padding:6px 12px; background:#0d1030; border:1px solid #262d5c; border-radius:100px; font-size:13px; line-height:1.2; color:#d5d8ee;">${esc(value)}</span>`,
      )
      .join("");

  const row = (label: string, valueHtml?: string) => {
    if (!valueHtml) return "";
    return `
      <tr>
        <td style="padding:14px 0 14px 0; border-bottom:1px solid ${LINE}; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:${MUTED}; white-space:nowrap; vertical-align:top; width:132px;">${label}</td>
        <td style="padding:14px 0 14px 20px; border-bottom:1px solid ${LINE}; font-size:15px; line-height:1.5; color:#ffffff; vertical-align:top;">${valueHtml}</td>
      </tr>
    `;
  };

  const stackedBlock = (label: string, valuesHtml?: string) => {
    if (!valuesHtml) return "";
    return `
      <tr>
        <td colspan="2" style="padding:18px 0 4px;">
          <p style="margin:0 0 10px; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:${MUTED};">${label}</p>
          <div>${valuesHtml}</div>
        </td>
      </tr>
    `;
  };

  const sectionHeading = (title: string) => `
    <tr>
      <td colspan="2" style="padding:34px 0 6px;">
        <p style="margin:0; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:${BLUE}; font-weight:700;">
          <span style="color:${MUTED};">[</span> ${title} <span style="color:${MUTED};">]</span>
        </p>
      </td>
    </tr>
  `;

  /** Three headline signals, side by side — the at-a-glance read. */
  const statCell = (label: string, value: string, last = false) => `
    <td width="33.33%" style="padding:18px 14px; background:#0b0b24; border-right:${last ? "none" : `1px solid ${LINE}`}; vertical-align:top;">
      <p style="margin:0 0 8px; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:${MUTED};">${label}</p>
      <p style="margin:0; font-size:16px; line-height:1.35; color:#ffffff; font-weight:700;">${esc(value)}</p>
    </td>
  `;

  const preheader = [
    submission.fullName,
    submission.companyName,
    services[0],
    submission.budgetRange ? `${submission.budgetRange} budget` : "",
  ]
    .filter(Boolean)
    .join(" · ");

  const html = `
<div style="margin:0; padding:0; background:${INK};">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent; font-size:1px; line-height:1px;">${esc(preheader)}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${INK}; margin:0; padding:0;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:100%; background:${CARD}; border:1px solid ${LINE}; border-radius:16px; overflow:hidden; font-family:'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">

          <!-- BRAND BLUE EDGE -->
          <tr><td style="height:4px; background:${BLUE}; font-size:0; line-height:0;">&nbsp;</td></tr>

          <!-- HEADER -->
          <tr>
            <td style="padding:28px 36px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" style="vertical-align:middle;">
                    <img src="${baseUrl}/dzignex_logo.svg" alt="Dzignex Studio" width="104" style="width:104px; height:auto; display:block; border:0;" />
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="display:inline-block; padding:7px 14px; background:${BLUE}; border-radius:100px; font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#ffffff;">New brief</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HEADLINE -->
          <tr>
            <td style="padding:30px 36px 0;">
              <p style="margin:0 0 14px; font-size:12px; letter-spacing:0.1em; color:${MUTED};">
                ${submission.reference ? `<span style="color:${BLUE}; font-weight:700;">${esc(submission.reference)}</span> &nbsp;·&nbsp; ` : ""}${esc(submittedAt)}
              </p>
              <h1 style="margin:0 0 8px; font-size:34px; line-height:1.15; font-weight:700; color:#ffffff;">
                ${esc(submission.fullName)}
              </h1>
              <p style="margin:0; font-size:18px; line-height:1.4; color:${BLUE}; font-weight:700;">
                ${esc(submission.companyName)}
              </p>
            </td>
          </tr>

          <!-- SIGNAL ROW -->
          <tr>
            <td style="padding:26px 36px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${LINE}; border-radius:12px; overflow:hidden;">
                <tr>
                  ${statCell("Budget", submission.budgetRange || "Not stated")}
                  ${statCell("Industry", submission.industry)}
                  ${statCell("Services", `${services.length} selected`, true)}
                </tr>
              </table>
            </td>
          </tr>

          <!-- ACTIONS -->
          <tr>
            <td style="padding:24px 36px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:8px; background:${BLUE};">
                    <a href="${esc(replyHref)}" style="display:inline-block; padding:14px 26px; font-size:15px; font-weight:700; color:#ffffff; text-decoration:none;">Reply to ${esc(firstName)}</a>
                  </td>
                  ${
                    waDigits
                      ? `<td style="width:12px;">&nbsp;</td>
                  <td style="border-radius:8px; border:1px solid #2a3163;">
                    <a href="https://wa.me/${esc(waDigits)}" style="display:inline-block; padding:13px 24px; font-size:15px; font-weight:700; color:#ffffff; text-decoration:none;">WhatsApp</a>
                  </td>`
                      : ""
                  }
                </tr>
              </table>
            </td>
          </tr>

          <!-- DETAILS -->
          <tr>
            <td style="padding:6px 36px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

                ${sectionHeading("Contact")}
                ${row("Email", `<a href="mailto:${esc(submission.email)}" style="color:#ffffff; text-decoration:none; border-bottom:1px solid ${BLUE};">${esc(submission.email)}</a>`)}
                ${row("WhatsApp", esc(submission.whatsappNumber))}
                ${submission.websiteOrInstagram ? row("Web / IG", linkify(submission.websiteOrInstagram)) : ""}

                ${sectionHeading("Project")}
                ${stackedBlock("Services required", services.length ? chips(services) : "")}
                ${goals.length ? stackedBlock("Main goal", chips(goals)) : ""}

                ${challenges.length ? sectionHeading("Context") : ""}
                ${challenges.length ? stackedBlock("Challenges", chips(challenges)) : ""}

              </table>
            </td>
          </tr>

          ${
            submission.message
              ? `<!-- MESSAGE -->
          <tr>
            <td style="padding:32px 36px 0;">
              <p style="margin:0 0 12px; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:${BLUE}; font-weight:700;">
                <span style="color:${MUTED};">[</span> In their words <span style="color:${MUTED};">]</span>
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0b0b24; border-left:3px solid ${BLUE}; border-radius:0 10px 10px 0;">
                <tr>
                  <td style="padding:18px 20px; font-size:15px; line-height:1.65; color:#d5d8ee;">${esc(submission.message).replace(/\n/g, "<br />")}</td>
                </tr>
              </table>
            </td>
          </tr>`
              : ""
          }

          <!-- DASHBOARD -->
          <tr>
            <td style="padding:32px 36px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${LINE};">
                <tr>
                  <td style="padding-top:22px; font-size:14px; line-height:1.6; color:${MUTED};">
                    Manage this lead in the studio dashboard —
                    <a href="${baseUrl}/dashboard/messages" style="color:${BLUE}; font-weight:700; text-decoration:none;">open messages &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:26px 36px 34px;">
              <p style="margin:0 0 6px; font-size:12px; line-height:1.6; color:#5f6484;">
                Sent automatically when the contact form on dzignex.studio is submitted. Replying to this email goes to the studio inbox, not to ${esc(firstName)} — use the button above to reach them.
              </p>
              <p style="margin:0; font-size:12px; color:#5f6484;">
                &copy; ${new Date().getFullYear()} Dzignex Studio. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</div>
  `;

  // Returns null (not "") for missing values so blank separator lines survive
  // the filter below.
  const textLine = (label: string, value?: string | string[]) => {
    const display = Array.isArray(value) ? value.join(", ") : value;
    return display ? `${label}: ${display}` : null;
  };

  const text = [
    "NEW BRIEF — Dzignex Studio",
    submission.reference ? `Reference: ${submission.reference}` : null,
    submittedAt,
    "",
    `${submission.fullName} — ${submission.companyName}`,
    "",
    textLine("Email", submission.email),
    textLine("WhatsApp", submission.whatsappNumber),
    textLine("Web / IG", submission.websiteOrInstagram),
    "",
    textLine("Industry", submission.industry),
    textLine("Budget", submission.budgetRange || "Not stated"),
    textLine("Services", services),
    textLine("Main goal", goals),
    textLine("Challenges", challenges),
    submission.message ? `\nIn their words:\n${submission.message}` : null,
    "",
    `Open messages: ${baseUrl}/dashboard/messages`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const subject = `New brief — ${submission.fullName}, ${submission.companyName}${
    submission.budgetRange ? ` (${submission.budgetRange} budget)` : ""
  }`;

  return sendEmail({
    to: notifyTo,
    subject,
    html,
    text,
    category: "contact_notification",
    senderEmail: submission.email,
  });
}
