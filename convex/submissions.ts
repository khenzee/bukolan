import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const submitForm = mutation({
  args: {
    plan: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    contactPreference: v.string(),
    projectName: v.string(),
    selections: v.array(
      v.object({
        question: v.string(),
        answer: v.union(v.string(), v.array(v.string())),
      })
    ),
    additionalNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // 1. Cooldown Check (Spam Prevention)
    const lastSubmission = await ctx.db
      .query("submissions")
      .filter((q) => q.eq(q.field("email"), args.email))
      .order("desc")
      .first();

    if (lastSubmission && Date.now() - lastSubmission.createdAt < 60000) {
      throw new Error("Please wait a moment before submitting again.");
    }

    // 2. Insert Submission
    const submissionId = await ctx.db.insert("submissions", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    });

    // 3. Trigger Email Notification (Asynchronous Action)
    // We schedule this to happen immediately after the mutation finishes
    await ctx.scheduler.runAfter(0, internal.resend.sendNotificationEmail, {
      submissionId,
    });

    return submissionId;
  },
});
