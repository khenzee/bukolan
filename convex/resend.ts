import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const sendNotificationEmail = internalAction({
  args: {
    submissionId: v.id("submissions"),
  },
  handler: async (ctx, args) => {
    // 1. Fetch the submission details from the database
    const submission = await ctx.runQuery(internal.resend.getSubmissionById, {
      submissionId: args.submissionId,
    });

    if (!submission) return;

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not set in Convex environment variables.");
      return;
    }

    // 2. Format the selections for the admin email
    const selectionsHtml = (submission.selections as { question: string; answer: string | string[] }[])
      .map(
        (s) => `
      <div style="margin-bottom: 10px;">
        <strong style="color: #666; font-size: 12px; text-transform: uppercase;">${s.question}</strong><br/>
        <span style="font-size: 14px;">${Array.isArray(s.answer) ? s.answer.join(", ") : s.answer}</span>
      </div>
    `
      )
      .join("");

    // 3. Prepare the emails
    const adminEmail = {
      from: "Bukolan <hello@divulge.digital>", 
      to: ["hello@divulge.digital"], 
      subject: `New ${submission.plan.toUpperCase()} Project Inquiry: ${submission.projectName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 40px; color: #1a1a1a;">
          <h1 style="font-size: 24px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: -0.5px;">New Project Inquiry</h1>
          <p style="color: #666; font-size: 14px; margin-bottom: 32px; text-transform: uppercase; letter-spacing: 1px;">Collaboration Model: <strong>${submission.plan}</strong></p>
          
          <div style="margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #eee;">
            <h2 style="font-size: 12px; text-transform: uppercase; color: #999; margin-bottom: 16px; letter-spacing: 1px;">Personal Information</h2>
            <p><strong>Name:</strong> ${submission.name}</p>
            <p><strong>Email:</strong> ${submission.email}</p>
            <p><strong>Phone:</strong> ${submission.phone}</p>
            <p><strong>Contact Preference:</strong> ${submission.contactPreference}</p>
            <p><strong>Business/Project:</strong> ${submission.projectName}</p>
          </div>

          <div style="margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #eee;">
            <h2 style="font-size: 12px; text-transform: uppercase; color: #999; margin-bottom: 16px; letter-spacing: 1px;">Project Details</h2>
            ${selectionsHtml}
          </div>

          ${submission.additionalNotes ? `
          <div style="margin-bottom: 32px;">
            <h2 style="font-size: 12px; text-transform: uppercase; color: #999; margin-bottom: 16px; letter-spacing: 1px;">Additional Notes</h2>
            <p style="font-style: italic;">"${submission.additionalNotes}"</p>
          </div>
          ` : ''}

          <div style="margin-top: 40px; font-size: 12px; color: #999; border-top: 1px solid #eee; pt: 20px;">
            Sent via Bukolan Automated System • ${new Date(submission.createdAt).toLocaleString()}
          </div>
        </div>
      `,
    };

    const userAcknowledgementEmail = {
      from: "Divulge Digital <hello@divulge.digital>",
      to: [submission.email],
      subject: `We've received your inquiry: ${submission.projectName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #1a1a1a; line-height: 1.6;">
          <h1 style="font-size: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 24px;">Hi ${submission.name},</h1>
          <p>Thank you for reaching out to us about your <strong>${submission.plan}</strong> project.</p>
          <p>This is just a quick note to let you know that we've successfully received your details for <strong>${submission.projectName}</strong>. Our team is currently reviewing your information and we will reach out to you via <strong>${submission.contactPreference}</strong> within the next 24 hours.</p>
          
          <div style="margin: 32px 0; padding: 24px; background-color: #f9f9f9; border-radius: 4px;">
            <h2 style="font-size: 12px; text-transform: uppercase; color: #999; margin-bottom: 12px;">What happens next?</h2>
            <ol style="margin: 0; padding-left: 18px; font-size: 14px;">
              <li style="margin-bottom: 8px;">We'll analyze your requirements and project scope.</li>
              <li style="margin-bottom: 8px;">A strategist will reach out to schedule a brief discovery call if needed.</li>
              <li>We'll provide a clear path forward for your project.</li>
            </ol>
          </div>

          <p>In the meantime, if you have any other questions, feel free to reply to this email.</p>
          
          <p style="margin-top: 48px; font-size: 14px;">
            Best regards,<br/>
            <strong>The Divulge Digital Team</strong>
          </p>
          
          <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #eee; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 1px;">
            © ${new Date().getFullYear()} Divulge Digital • Premium Web Experiences
          </div>
        </div>
      `,
    };

    // 4. Send both emails in parallel
    try {
      await Promise.all([
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminEmail),
        }),
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userAcknowledgementEmail),
        })
      ]);
    } catch (err) {
      console.error("Failed to send emails:", err);
    }
  },
});

// Internal helper query to fetch submission data for the action
import { internalQuery } from "./_generated/server";

export const getSubmissionById = internalQuery({
  args: { submissionId: v.id("submissions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.submissionId);
  },
});
