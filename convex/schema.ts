import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  submissions: defineTable({
    plan: v.string(), // lite, scale, grand
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    contactPreference: v.string(), // email, whatsapp, call
    projectName: v.string(),
    
    // Every choice made in the form is stored as a question-answer pair.
    selections: v.array(
      v.object({
        question: v.string(),
        answer: v.union(v.string(), v.array(v.string())),
      })
    ),
    
    additionalNotes: v.optional(v.string()),
    status: v.string(), // pending, reviewed, archived
    createdAt: v.number(),
  }),
});
