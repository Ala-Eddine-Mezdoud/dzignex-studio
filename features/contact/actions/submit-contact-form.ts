"use server"

import { db } from "../../../db/drizzle"
import { messages } from "../../../db/schema/messages"
import { sendContactNotificationEmail } from "../../../lib/email"
import { z } from "zod"

const contactFormSchema = z.object({
  fullName: z.string().min(2),
  whatsappNumber: z.string().min(8),
  companyName: z.string().min(2),
  email: z.string().email(),
  industry: z.string().min(1),
  serviceRequired: z.array(z.string()).min(1, "Please select at least one service."),
  websiteOrInstagram: z.string().optional(),
  budgetRange: z.string().optional(),
  challenges: z.array(z.string()).optional(),
  mainGoal: z.array(z.string()).optional(),
  message: z.string().optional(),
})

export async function submitContactForm(data: z.infer<typeof contactFormSchema>) {
  try {
    const validatedData = contactFormSchema.parse(data)

    await db.insert(messages).values({
      fullName: validatedData.fullName,
      email: validatedData.email,
      whatsappNumber: validatedData.whatsappNumber,
      companyName: validatedData.companyName,
      industry: validatedData.industry,
      serviceRequired: validatedData.serviceRequired,
      websiteOrInstagram: validatedData.websiteOrInstagram,
      budgetRange: validatedData.budgetRange,
      challenges: validatedData.challenges,
      mainGoal: validatedData.mainGoal,
      message: validatedData.message,
    })

    // Best-effort notification — a failed email should never fail the submission.
    sendContactNotificationEmail(validatedData).catch((error) => {
      console.error("Error sending contact notification email:", error)
    })

    return { success: true }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid form data" }
    }
    return { success: false, error: "Failed to submit message" }
  }
}
