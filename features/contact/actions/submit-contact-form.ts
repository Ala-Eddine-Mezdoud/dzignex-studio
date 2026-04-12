"use server"

import { db } from "../../../db/drizzle"
import { messages } from "../../../db/schema/messages"
import { z } from "zod"

const contactFormSchema = z.object({
  fullName: z.string().min(2),
  whatsappNumber: z.string().min(8),
  companyName: z.string().min(2),
  email: z.string().email(),
  industry: z.string().min(1),
  serviceRequired: z.string().min(1),
  websiteOrInstagram: z.string().optional(),
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
      message: validatedData.message,
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
