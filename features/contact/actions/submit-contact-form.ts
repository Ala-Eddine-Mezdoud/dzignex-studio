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

type SubmitContactFormResult =
  | { success: true; reference: string }
  | { success: false; error: string }

export async function submitContactForm(
  data: z.infer<typeof contactFormSchema>,
): Promise<SubmitContactFormResult> {
  try {
    const validatedData = contactFormSchema.parse(data)

    // Shared between the visitor's confirmation screen and the studio's
    // notification email, so both sides quote the same brief.
    const now = new Date()
    const mmdd = `${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`
    const reference = `DZX-${mmdd}-${String(Math.floor(1000 + Math.random() * 9000))}`

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

    // The notification MUST be awaited. On serverless the instance is frozen as
    // soon as this action returns, so a fire-and-forget promise is killed
    // mid-SMTP-handshake and the studio never hears about the lead. The race
    // caps how long the visitor waits: a slow or broken mailbox degrades to a
    // logged failure, never to a failed submission.
    const notification = await Promise.race([
      sendContactNotificationEmail({ ...validatedData, reference }),
      new Promise<{ success: false; error: string }>((resolve) =>
        setTimeout(
          () => resolve({ success: false, error: "Timed out after 9s" }),
          9_000,
        ),
      ),
    ]).catch((error) => ({
      success: false as const,
      error: error instanceof Error ? error.message : "Unknown error",
    }))

    if (!notification.success) {
      // Loud on purpose: the brief is safely stored, but nobody has been told.
      console.error(
        `[contact] ${reference} saved but notification FAILED: ${notification.error}`,
      )
    }

    return { success: true, reference }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid form data" }
    }
    return { success: false, error: "Failed to submit message" }
  }
}
